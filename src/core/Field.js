import { FormItem } from 'element-ui'
// import Path from 'cool-path'
import { merge } from 'lodash'
import log from './log'
import {
  getType,
  dasherize,
  getMySlots,
  getMyProps,
  getParentForm,
  // transformDataSource,
  computedFormSameProps,
} from './utils'
import { computedRules } from './rules'

const ELFormItem = FormItem

const defaultOpts = {
  registerComponents: {},
  defaultComponent: 'input',
}

/**
 * 实现vmodel版本的HOC
 * @param {*} Component 类Input组件, 内部必须已经实现了v-model
 * @param {*} fieldContext field上下文
 */
export const CreateVModelComponent = (Component, fieldContext) => {
  const { name } = fieldContext

  const helperProps = computedFormSameProps(getParentForm(fieldContext), fieldContext)


  const FormContext = fieldContext.YFORM
  const ComponentType = getType(Component)
  const { registerComponents, defaultComponent } = defaultOpts

  if (ComponentType === 'string') {
    if (!registerComponents[Component]) {
      Component = registerComponents[defaultComponent]
    } else {
      Component = registerComponents[Component]
    }
  }

  const { value: ComponentPropsValue, ...ComponentProps } = Component.props

  return {
    name: `hoc-field-${Component.name || Component.componentName}`,
    props: ComponentProps,
    render(h) {
      // 将yfield 上的slot 放到input里
      // TODO: 优化 去掉 slot label
      const slots = getMySlots(fieldContext, this, '*')
      const value = FormContext.getFieldValue(name)
      const { previewValue } = fieldContext
      if (helperProps.fieldStatus === 'preview') {
        return previewValue
          ? <div>{previewValue(value)}</div>
          : <span>{value}</span>
      }

      // 最高优先级的 component-props
      const firstComponentProps = { ...(fieldContext.$attrs['component-props'] || {}), ...(fieldContext.$attrs.componentProps || {}) }
      const { class: className, style, ...componentProps } = firstComponentProps

      const events = fieldContext.$listeners || {}

      const ELFormItemInstants = fieldContext.$children[0]

      const onInput = (newValue) => {
        /**
         * TODO: 原生控件
         */
        FormContext.setFieldValue(name, newValue)
        return events.input && events.input(newValue)
      }

      const onBlur = (newValue) => {
        ELFormItemInstants.onFieldBlur()
        return events.blur && events.blur(newValue)
      }

      const onChange = (newValue) => {
        ELFormItemInstants.onFieldChange()
        return events.change && events.change(newValue)
      }

      return h(Component, {
        class: className,
        style,
        props: Object.assign(
          getMyProps(Component, this),
          getMyProps(Component, fieldContext.$attrs),
          componentProps,
          {
            value,
            disabled: helperProps.disabled,
          },
        ),
        on: {
          ...events,
          input: onInput,
          // 兼容iview
          'on-blur': onBlur,
          'on-change': onChange,
          blur: onBlur,
          change: onChange,
        },
        // attrs 暂未区分field 还是 input 的，问题不大
        attrs: fieldContext.$attrs,
        scopedSlots: this.$scopedSlots,
      }, slots)
    }
  }
}

const Field = {
  name: 'YField',
  props: {
    ...ELFormItem.props,
    // label 不限于字符串 还可以传html片段vnode
    label: {
      type: [String, Object],
      default: '',
    },
    // 字段名 路径
    name: {
      type: String,
    },
    // 表单控件
    component: {
      default: 'el-input',
    },
    // select 类型控件的options
    dataSource: {
      type: [Object, Array],
      default: () => [],
    },
    /**
     * 转化方法
     */
    'format-functions': {
      type: Array,
      validator(value) {
        let valid = false
        if (getType(value) === 'array' && value.length === 2) {
          const [value1, value2] = value
          if (getType(value1) === 'function' && getType(value2) === 'function') {
            valid = true
          }
        }
        if (!valid) {
          log.error(`
          format-functions 应该是一个数组，必须包含2个相反的数据转化方法, 如：
          [val => val * 100, val => val / 100]
          `)
        }
        return valid
      },
      default: () => [
        val => val, val => val
      ]
    },
    // 表单域态 edit、preview、disabled
    fieldStatus: {
      type: String,
    },
    // 自定义预览控件 (value) => vnode
    'preview-value': {
      type: Function,
    },
    // label后自动添加 冒号, 优先级高于 form.colon
    colon: {
      // type: [String, Boolean],
      // required: false,
    },
  },
  computed: {
    YFORM() {
      return getParentForm(this)
    },
    Input() {
      // 优化性能， 防止类Input组件不必要的 rerender
      return CreateVModelComponent(this.component, this)
    }
  },
  methods: {
    onInuooo() {
      console.log('onInuooo')
    },
  },

  render(h) {
    const { registerComponents, defaultComponent } = defaultOpts

    const {
      name,
    } = this
    // const { colon: formColon } = getParentForm(this)
    let component = this.component
    if (getType(component) === 'string') {
      component = dasherize(component)
      if (Object.prototype.hasOwnProperty.call(registerComponents, component)) {
        component = registerComponents[component]
      } else {
        log.error(`
        标签名${component}未注册，请先到注册的YField opts.registerComponents里声明 示例如下：
        main.js文件
        Vue.use(YField, {
          registerComponents: {
            ${component}: ${component},
            ...
          }
        })
        `)
        if (!defaultComponent) {
          log.warn('建议你声明一个defaultComponent')
        }
        component = registerComponents[defaultComponent]
      }
    }
    const FormItemProps = this.$props
    const helperProps = computedFormSameProps(getParentForm(this), this)

    // 适配 label 或者 slot label
    let label = null
    if (getType(FormItemProps.label) === 'string') {
      label = FormItemProps.label ? `${FormItemProps.label}${helperProps.colon}` : ''
    } else {
      log.warn(`
        ${name}字段, 如果你需要 VNode 类型的label，你应该使用如下写法这样处理：
        <YField name="name" >
          <div slot="label">label ...</div>
        </YField>
      `)
    }

    const labelStr = (getType(label) === 'string' && label) || ''
    let slots = getMySlots(this, this, 'label')

    return h(ELFormItem, {
      props: {
        ...FormItemProps,
        ...helperProps,
        label: labelStr,
        rules: computedRules(FormItemProps.rules || [], labelStr, name),
        prop: this.name,
      },
      on: {
        // 事件未区分 field input，问题不大
        ...(this.$listeners || {}),
      },
      attrs: this.$attrs,
      key: name,
      // slots: {
      //   label: () => h(getType(label) !== 'string' && label),
      // },
      // slots: () => ({
      //   label: h(getType(label) !== 'string' && label),
      // }),
    }, [
      ...slots,
      h(this.Input)
    ])
  }
}

Field.install = function(Vue, opts = {}) {
  merge(defaultOpts, opts)
  Vue.component(Field.name, Field)
}

export default Field
