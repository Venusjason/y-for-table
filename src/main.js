import Vue from 'vue'
import {
  Input, Button, Tooltip, Select, Option
} from 'element-ui'
import {
  Input as IInput,
  // Select as ISelect,
  // Option as IOption
} from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App.vue'
import {
  YForm, YField, CreateYButton, YQueryTable
} from './core/index'

// import {
//   YForm, YField, CreateYButton, YQueryTable
// } from '../lib/y-for-table.umd'
// import '../lib/y-for-table.css'

// console.log(YForTable)
const ELButton = Button

const YButton = CreateYButton(ELButton)

Vue.use(YForm)
Vue.use(YField, {
  registerComponents: {
    'el-input': Input,
    'el-select': Select,
    'el-option': Option,
    'i-input': IInput,
  },
  defaultComponent: 'el-input',
})
Vue.use(YButton)
Vue.use(YQueryTable)

Vue.use(ELButton)
Vue.use(Tooltip)
Vue.use(Option)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
