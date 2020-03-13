import AsyncValidator from 'async-validator'
import { getType } from './utils'
import { computedRules } from './rules'
import CreateVModelComponent from './VModelComponent'

export default {
  name: 'YField',
  props: [
    'label',
    'label-width',
    'name',
    'rules',
    'required',
    'component',
    'nativeComponent',
  ],
  provide() {
    return {
      YFIELD: this,
      // 兼容 element-ui
      elFormItem: this,
    }
  },
  inject: ['YFORM'],
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
    }
  },
  computed: {
    VModelComponent() {
      // 使用 computed 返回这个组件是因为 render 可能会重复创建新的组件 导致光标不停失去焦点，无法连续输入
      return CreateVModelComponent(this)
    }
  },
  mounted() {
    if (this.name) {
      this.YFORM.onFieldAdd(this)
      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.YFORM.onFieldRemove(this)
  },
  methods: {
    renderLabel (h) {
      const type = getType(this.label)
      if (type === 'object') {
        const Label = this.label
        return h('span', {
          style: {
            dispaly: 'inline-block',
          },
          class: 'i'
        }, [Label])
      } else if (type === 'string') {
        return this.label
      }
    },
    getRules() {
      let rules = this.rules || []
      if (rules.length || this.required) {
        // 校验该字段
        if (this.required) {
          rules.push('required')
        }
        rules = computedRules(rules, this.label, this.name)
      }
      return rules
    },
    addValidateEvents() {
      let rules = this.getRules()
      if (rules.length) {
        // 注册事件 input 需要主动调用它
        console.log('addValidateEvents')
        this.onFieldBlur()
        this.onFieldChange()
      }
    },
    onFieldBlur() {
      console.log('onFieldBlur')
      this.validate('blur')
    },
    onFieldChange() {
      this.validate('change')
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },
    validate(trigger, callback) {
      const rules = this.getFilteredRule(trigger)
      if (!rules.length) {
        callback && callback()
        return true
      }
      this.validateState = 'validating'
      const descriptor = {
        [this.name]: rules
      }
      const validator = new AsyncValidator(descriptor)
      const model = {
        [this.name]: this.YFORM.getFieldValue(this.name)
      }
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
        this.YFORM.onValidate(this.name, !errors, this.validateMessage)
      })
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
  },
  render(h) {
    const { name, label } = this
    const value = this.YFORM.value[this.name]

    return (
      <div>
        <div>field: {label}{this.renderLabel(h)}, {name}: {value}</div>
        <div>
          {
            h(this.VModelComponent)
          }
        </div>
        <span style="color: red">{this.validateMessage}</span>
      </div>
    )
  }
}