import Form from './Form'
import Field from './Field'

console.log(Field)

Form.install = function(Vue) {
  Vue.component(Form.name, Form)
}

Field.install = function(Vue) {
  Vue.component(Field.name, Field)
}

// export default (options) => {
//   const defaultOptions = {
//     /**
//      * 注册组件
//      */
//     registerComponents: {},
//   }
// }

export const registerOpts = {
  /**
   * 注册组件
   */
  registerComponents: {},
  defaultComponent: 'input',
}

const components = [
  Form,
  Field,
]

const install = (Vue, opts = {}) => {
  Object.assign(registerOpts, opts)
  Vue.prototype.$yForTableOpts = registerOpts
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
