### 安装

建议使用 vue的jsx方式开发复杂表单，熟悉react的同学应该上手很快

 - 开启项目中vue的jsx方式
 - 按需导入 第三方ui组件库
 - main.js里全局导入y-for-table的几个组件

```
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props babel-plugin-component -D
```
.babelrc.js 里配置webpack编译jsx和按需导入组件库

```javascript

module.exports = {
  presets: [
     ['@vue/app', {
         useBuiltIns: 'entry'
     }],
      ['@vue/babel-preset-jsx',
      {
          "injectH": false
      }],
      ["@babel/preset-env", { "modules": false }],
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
}


```

由于element-ui组件比较多，建议新建一个文件来处理

```
touch installELementUi.js
```
导入element ui组件
```
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

const InstallElement = (Vue) => {
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Autocomplete)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.use(Switch)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(OptionGroup)
  Vue.use(Button)
  Vue.use(ButtonGroup)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(DatePicker)
  Vue.use(TimeSelect)
  Vue.use(TimePicker)
  Vue.use(Popover)
  Vue.use(Tooltip)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Tag)
  Vue.use(Tree)
  Vue.use(Alert)
  Vue.use(Slider)
  Vue.use(Icon)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Upload)
  Vue.use(Progress)
  Vue.use(Spinner)
  Vue.use(Badge)
  Vue.use(Card)
  Vue.use(Rate)
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Cascader)
  Vue.use(ColorPicker)
  Vue.use(Transfer)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Footer)
  Vue.use(Timeline)
  Vue.use(TimelineItem)
  Vue.use(Link)
  Vue.use(Divider)
  Vue.use(Image)
  Vue.use(Calendar)
  Vue.use(Backtop)
  Vue.use(PageHeader)
  Vue.use(CascaderPanel)

  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}

export defalut InstallElement

export const YFieldOpts = {
  registerComponents: {
    'el-input': Input,
    ...element-ui的表单控件
  },
  defaultComponent: 'el-input'
}

```

main.js

```
import Vue from 'vue'
import Vue from 'vue'
import { Button } from 'element-ui'
import 'y-for-table/lib/index.css'
import InstallElement, { YFieldOpts } from './installElement'

InstallElement(Vue)
const ELButton = Button
const YButton = CreateYButton(ELButton)
Vue.use(YForm)
Vue.use(YField, YFieldOpts)
Vue.use(YButton)
Vue.use(YQueryTable)

```

> YFieldOpts 这里的配置会在YField里讲到

到这里 你的项目就完成了y-for-table的接入