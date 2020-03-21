import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import Path from 'cool-path'
// import log from './log'

const ELForm = Form

const { model, ...ELFormProps } = ELForm.props

const YForm = {
  name: 'YForm',
  props: {
    ...ELFormProps,
    // form value 对应 element model
    value: {
      type: Object,
      required: true,
    },
    // 回调函数 返回form ref
    wrappedComponentRef: {
      type: Function,
      required: false,
    },
    // label后自动添加 冒号
    colon: {
      type: [Boolean, String],
      required: false,
    },
    // 表单态 edit、preview、disabled
    formStatus: {
      type: String,
      default: 'edit',
    },
  },
  data() {
    return {
      /**
       * 表单初始值 用于重置时使用
       */
      initValue: {},
    }
  },
  mounted() {
    this.wrappedComponentRef && this.wrappedComponentRef(this.$refs.form)
    this.setInitValue()
  },
  methods: {
    setInitValue() {
      Object.assign(this.initValue, cloneDeep(this.value))
    },
    setFieldValue(name, value) {
      Path.setIn(this.value, name, value)
    },
    setFieldsValue(data) {
      Object.assign(this.value, data)
    },
    getFieldValue(name) {
      return Path.getIn(this.value, name)
    },
  },
  render(h) {
    const props = this.$props

    return h(ELForm, {
      props: {
        ...props,
        // 基于开发习惯 默认设置 label-position right
        // labelPosition: props.labelPosition || 'right',
        // 基于开发习惯 默认设置 label-width 100px
        // labelWidth: props.labelWidth || '100px',
        model: this.value,
      },
      on: {
        ...this.$listeners,
      },
      attrs: this.$attrs,
      slots: this.$slots,
      ref: 'form',
    }, [
      this.$slots.default,
      // process.env.NODE_ENV === 'development' && <Debugger value={this.value} />
    ])
  },
}

YForm.install = function(Vue) {
  Vue.component(YForm.name, YForm)
}

export default YForm