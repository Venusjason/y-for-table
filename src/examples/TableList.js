import axios from 'axios'

export default {

  data() {
    return {
      params: {
        goodsName: 'macbookPro',
        leimu: 1,
        priceMin: null,
        priceMax: null
      }
    }
  },

  methods: {
    del(data) {
      console.log(data)
    },
  },

  render(h) {
    const serve = async ({ params }) => {
      const params1 = {
        page: params.currentPage,
        pageSize: params.pageSize,
        activityCode: '11111111',
        ...this.params
      }
      const res = await axios.get('http://yapi.ywwl.org/mock/270/admin/pageOrder/list', { params: params1 })
      return {
        data: res.data.data.list,
        total: res.data.total
      }
    }

    const columns = [
      { type: 'selection' },
      { prop: 'distributorNickName', label: '分销员昵称' },
      {
        label: '订单状态', render: ({ row }) => {
          const STATUS = {
            1: '成功',
            2: '失败',
          }
          return STATUS[row.status]
        }
      },
      { prop: 'price', label: '售价' },
      { prop: 'expressNumber', label: '快递单号' },
      {
        label: '操作',
        render: ({ row }) => (
          <div>
            <el-button type="danger" size="mini" onClick={() => this.del(row)} >删除</el-button>
          </div>
        )
      },
    ]

    const validatorPrice = (rule, val, callback) => {
      const { priceMin, priceMax } = this.params
      if (priceMin && priceMax && (Number(priceMin) > Number(priceMax) || priceMin === priceMax)) {
        return callback(new Error(`${priceMin} ~ ${priceMax} 价格区间有误`))
      }
      callback()
    }

    return (
      <div>
        <p>YQueryTable 示例</p>

        <YForm value={this.params} label-width="100px" colon inline size="small">
          <YField name="goodsName" label="商品名称" />
          <YField name="leimu" label={
            <el-tooltip effect="dark" content="label 提示文字" placement="top-start">
              <span style="color: green" >类目<i class="el-icon-warning-outline"></i>：</span>
            </el-tooltip>
          } clearable component="el-select">
            <el-option label={'类目1'} value={1}></el-option>
            <el-option label={'类目2'} value={2}></el-option>
          </YField>

          <YField name="priceMin" label="价格区间" rules={[
            'maxFixed2',
            { validator: validatorPrice }
          ]} placeholder="最小价格">
            <div slot="append" >元</div>
          </YField>
          <span style="display: inline-block;margin: 0 20px 0 20px;">-</span>
          <YField name="priceMax" label-width="0" rules={[
            'maxFixed2',
            { validator: validatorPrice }
          ]} placeholder="最大价格">
            <span slot="append" >元</span>
          </YField>

          <YButton do="submit">查询</YButton>
          <YButton do="reset" size="mini" />

        </YForm>

        <YQueryTable
          columns={columns}
          serve={serve}
        />
      </div>
    )
  }
}