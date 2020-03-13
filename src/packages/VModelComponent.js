import { getType, getMySlots } from './utils'

export default (
  fieldContext
) => {
  let Component = fieldContext.component
  const FormContext = fieldContext.YFORM
  const ComponentType = getType(Component)
  const { registerComponents, defaultComponent } = fieldContext.$yForTableOpts

  if (ComponentType === 'string') {
    if (!registerComponents[Component]) {
      console.warn(`${Component}需要全局注册到Y-For-Table的opts.registerComponents`)
      Component = registerComponents[defaultComponent]
    } else {
      Component = registerComponents[Component]
    }
  }
  const { value: ComponentPropsValue, ...ComponentProps } = Component.props
  const { name } = fieldContext
  return {
    name: `v-model-${Component.name || Component.componentName || 'input'}`,
    props: ComponentProps,
    // functional: true,
    computed: {
    },
    methods: {
      getInput() {
        return this.$refs.input || this.$refs.textarea || this.$el
      },
      nativeInputValue(value) {
        return value === null || value === undefined ? '' : String(value)
      },
      setNativeInputValue(value) {
        const input = this.getInput()
        if (!input) return
        const nativeInputValue = this.nativeInputValue(value)
        if (input.value === nativeInputValue) return
        input.value = nativeInputValue
      },
    },
    render(h) {
      // const { name } = fieldContext
      const value = FormContext.getFieldValue(name)

      const slots = getMySlots(fieldContext, this, '*')

      const events = fieldContext.$listeners || {}

      /**
       * TODO: 兼容原生控件
       */

      return h(Component, {
        props: {
          ...this.$props,
          value,
        },
        attrs: {
          ...fieldContext.$attrs,
          value
        },
        scopedSlots: this.$scopedSlots,
        on: {
          ...events,
          input: (e) => {
            let newValue = e
            // 原生控件
            if (e.target && e.target.localName) {
              newValue = e.target.value
            }
            FormContext.setFieldValue(name, newValue)
            this.setNativeInputValue(newValue)
            return events.input && events.input(newValue)
          },
          blur: () => {
            fieldContext.onFieldBlur()
            return events.blur && events.blur(value)
          },
          change: () => {
            fieldContext.onFieldChange()
            return events.change && events.change(value)
          },
        }
      }, slots)
    }
  }
}