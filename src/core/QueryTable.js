import { Pagination, Loading } from 'element-ui'
import Table from './Table'
import log from './log'

const ELPagination = Pagination

export const CreateQueryTable = (TableComponent = Table) => {
  const { data, ...YElTableJsxProps } = TableComponent.props
  const {
    currentPage: paginationPropsCurrentPage,
    pageSize: paginationPropsPageSize,
    ...paginationProps
  } = ELPagination.props

  const QueryTable = {
    name: 'YQueryTable',
    props: {
      ...YElTableJsxProps,
      pagination: {
        ...paginationProps,
      },
      // 默认第几页 非必填，默认第1页
      defaultCurrentPage: {
        type: Number,
        default: 1,
      },
      // // 默认pageSize 非必填，默认10条
      defaultPageSize: {
        type: Number,
        default: 10,
      },
      showLoading: {
        type: Boolean,
        default: true
      },
      // 接口函数 应该是一个promise
      // 类似中间件模式， 使用时组件时可以自定义处理数据格式
      // 返回数据格式 data
      /**
       * 接口函数 应该是一个promise
       * 类似中间件模式， 使用时组件时可以自定义处理数据格式
       * 返回数据格式 {
       *  data: table需要的list 必须
       *  total: 总条数 必须
       *  currentPage: 页码 可不返回
       *  pageSize: 可不返回
       * }
       */
      serve: {
        type: [Function, Promise],
      },
    },
    data() {
      return {
        loading: false,
        data: [],
        total: 0,
        pageParams: {
          currentPage: 1,
          pageSize: 10,
        },
        ispagination: true,
      }
    },
    created() {
      // 挂载时 使用default分页
      Object.assign(this.pageParams, {
        currentPage: this.defaultCurrentPage,
        pageSize: this.defaultPageSize,
      })
      this.refreshList()
    },
    methods: {
      getPaginationProps(someParams = {}) {
        const defaultPaginationProps = {
          pageSizes: [10, 20, 50, 100],
          layout: 'total, prev, pager, next, jumper',
          total: 100,
        }
        return {
          ...defaultPaginationProps,
          ...(this.pagination || {}),
          ...this.pageParams,
          ...someParams,
        }
      },
      // 如果在翻页前需要某些拦截操作，这里需要一个promise
      paginationMethodsIntercept(method) {
        // const methods = [
        //   'onSizeChange', 'onCurrentChange', 'onPrevClick', 'onNextClick'
        // ]
        if (this.pagination && this.pagination[method]) {
          return this.pagination[method]
        } else {
          return (i) => Promise.resolve(i)
        }
      },
      handleSizeChange(pageSize) {
        this.paginationMethodsIntercept('onSizeChange')(pageSize).then(() => {
          this.refreshList({
            currentPage: 1,
            pageSize
          })
        })
      },
      handleCurrentChange(currentPage) {
        this.paginationMethodsIntercept('onCurrentChange')(currentPage).then(() => {
          this.refreshList({ currentPage })
        })
      },
      refreshList(someParams = {}) {
        // TODO: 自动取消上一次接口
        if (this.loading) return
        const { currentPage, pageSize } = this.getPaginationProps(someParams)
        this.loading = true
        let loadingInstance = null
        if (this.showLoading && this.$el) {
          loadingInstance = Loading.service({
            fullscreen: false,
            target: this.$el,
            // background: 'rgba(0, 0, 0, 0.8)',
            spinner: 'el-icon-loading',
            text: '列表查询中...',
          })
        }
        this.serve({
          params: { currentPage, pageSize }
        }).then(res => {
          this.loading = false
          loadingInstance && loadingInstance.close()
          loadingInstance = null
          this.data = res.data
          this.total = res.total
          this.pageParams.currentPage = pageSize
          this.pageParams.currentPage = currentPage
          // 列表更新完的 回调函数
          this.$emit('refreshListCb', {
            ...res,
            currentPage,
            pageSize,
          })
        }).catch(e => {
          log.error(e)
          this.loading = false
          loadingInstance && loadingInstance.close()
          loadingInstance = null
          // todo: 修复 element 在分页控件上的问题，element应该是以交互优先
          // 如点击2 2页接口挂掉，其实需要回退到上一页的页码高亮，erlement 还是2
          this.refreshPaginationForUi()
        })
      },
      refreshPaginationForUi() {
        this.ispagination = false
        setTimeout(() => {
          this.ispagination = true
        }, 10)
      },
    },
    render(h) {
      const {
        currentPage, pageSize, pageSizes, layout, total, ...pageRest
      } = this.getPaginationProps()
      const onPageChange = {
        'size-change': i => this.handleSizeChange(i),
        'current-change': i => this.handleCurrentChange(i),
      }
      // 过滤出 table属性的props
      const RenderTableProps = {}
      Object.keys(YElTableJsxProps).forEach(key => {
        RenderTableProps[key] = this[key]
      })

      // 过滤出 table属性的on
      const RenderTableEvents = {}
      Object.keys(this.$listeners || {}).forEach(key => {
        RenderTableEvents[key] = this.$listeners[key]
      })

      const RenderTable = h(TableComponent, {
        props: {
          data: this.data,
          columns: this.columns,
          loading: this.loading,
          ...RenderTableProps
        },
        on: RenderTableEvents,
        ref: 'table',
      })

      return (
        <div>
          {
            RenderTable
          }
          <div style="padding: 40px 0 20px 0; text-align: center;">
            {
              this.ispagination && (
                <ELPagination
                  on={onPageChange}
                  currentPage={this.pageParams.currentPage}
                  pageSize={this.pageParams.pageSize}
                  pageSizes={pageSizes}
                  layout={layout}
                  total={this.total}
                  disabled={this.loading}
                  {...pageRest}
                ></ELPagination>
              )
            }
          </div>
        </div>
      )
    }
  }

  QueryTable.install = function(Vue) {
    Vue.component(QueryTable.name, QueryTable)
  }

  return QueryTable
}

const YQueryTable = CreateQueryTable()

export default YQueryTable