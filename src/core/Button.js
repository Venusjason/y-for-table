import {
  getType, getLatestYQueryTable, getMySlots, getParentForm
} from './utils'
import log from './log'

export const CreateYButton = (ButtonComponent = 'button') => {
  if (['object', 'string'].indexOf(getType(ButtonComponent)) === -1) {
    return log.warn(`${ButtonComponent} 应该是一个组件，而不是${getType(ButtonComponent)}`)
  }
  const Button = {
    name: 'YButton',
    props: {
      ...(getType(ButtonComponent) === 'object' ? ButtonComponent.props : {}),
      // 按钮功能 可选值 submit / reset / ''
      do: {
        type: String,
        required: false,
        default: '',
        validator(value) {
          return ['submit', 'reset', ''].indexOf(value) !== -1
        },
      },
    },
    computed: {
      form() {
        return getParentForm(this)
      },
      // 找到对应的 YQueryTable
    },
    methods: {
      // 手动调用按钮点击
      onClick(ev) {
        if (this.$listeners.click) {
          // 调用时声明了 click 采用调用声明
          this.$listeners.click(ev)
        } else {
          if (!this.form) {
            if (process.env.NODE_ENV === 'development') {
              log.warn('YButton 组件似乎没有放置在YForm内，这会导致YButton在渲染时无法保证YForm组件已经实例化，从而导致无法关联form上下文')
            }
          }
          /**
           * 采用内置列表查询, 这里必须采用运行时获取YQueryTable
           * 因为不能保证button渲染时 YQueryTable已经实例化
           * 如果用computed则很可能获取不到 YQueryTable
           */
          // 校验表单
          const formRef = this.form.$children[0]
          // 表单重置
          if (this.do === 'reset') {
            this.form.setFieldsValue(this.form.initValue)
          }
          formRef.validate(valid => {
            if (!valid) return
            try {
              const latestYQueryTable = getLatestYQueryTable(this)
              latestYQueryTable && latestYQueryTable.refreshList({ currentPage: 1 })
              // TODO: 表单校验提交 可以调用YForm onSubmit(formValues)
            } catch (e) {
              if (process.env.NODE_ENV === 'development') {
                log.error(e)
              }
            }
          })
          if (ev && ev.preventDefault) {
            ev.preventDefault()
          } else {
            window.event.returnValue = false
          }
          return false
        }
      },
    },
    render(h) {
      let slots = getMySlots(this, this)
      if (slots.length === 0) {
        if (this.do === 'submit') {
          slots = ['提交']
        } else if (this.do === 'reset') {
          slots = ['重置']
        }
      }
      const props = this.$props
      let latestYQueryTable = getLatestYQueryTable(this) || {
        loading: false
      }
      let type = props.type
      if (type === 'default' && this.do) {
        type = this.do === 'submit' ? 'primary' : ''
      }
      return h(ButtonComponent, {
        props: {
          ...props,
          // 默认使用 form声明的size
          size: props.size || (this.form && this.form.size),
          type,
          disabled: props.disabled || latestYQueryTable.loading,
        },
        on: {
          ...this.$listeners,
          click: this.onClick,
        }
      }, slots)
    }
  }

  Button.install = function(Vue) {
    Vue.component(Button.name, Button)
  }

  return Button
}

const YButton = CreateYButton()

export default YButton