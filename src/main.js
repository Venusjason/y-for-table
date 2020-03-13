import Vue from 'vue'
import { Input, Select, Option } from 'element-ui'
import {
  Input as IInput,
  Select as ISelect,
  Option as IOption
} from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App.vue'

import YForTable from './packages/index'

Vue.use(YForTable, {
  registerComponents: {
    'el-input': Input,
    'el-select': Select,
    'el-option': Option,
    'i-input': IInput,
    'i-select': ISelect,
    'i-option': IOption,
  },
  defaultComponent: 'el-input',
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
