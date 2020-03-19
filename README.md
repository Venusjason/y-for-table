### y-for-table

- 定位 编程式表单 解决vue表单动态逻辑难以在template里书写
- 你需要jsx来利用js的完全编程能力
- q-former 是一个json化表单方案，在表达复杂嵌套ui结构时比较费力，另外json配置化是一个更适合机器阅读的方案，编程化更适合开发者上手使用
- 提供全场景的log提示，对错误用法给出正确示例，减少找文档时间

> 当前方案是基于 element-ui form体系做了二次开发，当然不限于ui库来做表单方案也不是难题

1. 需要改用按需引入 element-ui, .babelrc.js示例
`npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props babel-plugin-component -D`

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

2. 按需引入element , mian.js

```javascript
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

InstallElement(Vue)

```
3. 全局引入YForm
`main.js` 文件
```
import {
  YForm, YField, CreateYButton, YQueryTable
} from 'y-for-table'
import 'y-for-table/lib/index.css'

const YButton = CreateYButton(ELButton)

Vue.use(YForm)
Vue.use(YField, {
  registerComponents: {
    'el-input': Input,
    'el-select': Select,
    'el-option': Option,
  },
  defaultComponent: 'el-input',
})
Vue.use(YButton)
Vue.use(YQueryTable)

```

#### YForm

* YForm 实对elemnt ui form 组件做了一层HOC实现，保留原有ui组件原有api基础上增加了几个api

| YForm        | el-form        | value   | 说明 |
| ------------- |:-------------:|   -----:| -----:|
| value      | model            |   Object| 表单值,替代elform的model |
| wrappedComponentRef| -      |   Function (formRef) => {} | 回调ref，返回form实例 |
| colon |  label-suffix      |    String/Boolean | label后缀 |
| formStatus | - | String | 表单态 edit、preview、disabled |


#### YField

- 与YForm 同名的api 优先级必然高于YForm
- 为了简化使用时代码片段，这里将field 与 Input类组件合并为一个 YField 标签，field 与 Input类共同使用YField上的属性，因为field上一般不会有与Input类组件同名api
- class style 这类顶级属性会作用到YField上，也就意味着你无法设置Input类样式，后期会增加 componentProps 属性来将field 与 Input类属性显式隔离开
- YField 上的name 就是YField hoc组件代理的 component 组件的v-model

##### YField opt
- 使用`Vue.use(YField, opt)`时需要全局注册的组件

| YField opt  | value   | 说明 |
| ------------- |:-------------:|   -----:|
|registerComponents| object | 注入类Input组件，键名就是 YField component|
|defaultComponent| string | VNode | 可省略component时使用 |

>


| YField        | el-form-item        | value   | 说明 |
| ------------- |:-------------:|   -----:| -----:|
| label      | label            |   String / VNode| 可以传html片段的（VNode） |
| component |  -    | String/VNode | 表单域控件, 默认 el-input |
| component-props |  -    | Object | 类Input组件, 只会作用于component组件上, 会覆盖到Field上同名配置 |
| dataSource |  -   |  Object, Array | 每个配置项需要有 label/value 字段 |
| colon |  label-suffix      |    String/Boolean | label后缀 |
| formStatus | - | String | 表单域态 edit、preview、disabled |


#### YButton

```
 do: {
    type: String,
    required: false,
    default: '',
    validator: function(value) {
      return ['submit', 'reset', ''].indexOf(value) !== -1
    },
  },
...其他为 el-button 的api
```
示例

- YButton 组件就是Button的增强，他会自动寻找到上下文中最近的YForm、YQueryTable 自动执行查询、重置功能
- submit 会自动触发列表查询接口
- reset 就是表单重置到初始值并触发列表查询接口

```
<YButton do="submit">查询</YButton>
<YButton do="submit" size="mini" />
<YButton do="reset" size="mini" />
```

#### YElTableJsx

- 保留了 el-table 的所有特性,改装出的jsx版本
- api columns 为数组
- column 项保留了 el-table-column 所有api,唯一改写的是作用域插槽为render函数

#### YQueryTable

- defaultCurrentPage 默认第几页 非必填，默认第1页
- defaultPageSize 默认pageSize 非必填，默认10条
- showLoading 局部loading展示 默认true
- serve 接口函数 应该是一个promise,类似中间件模式， 使用时组件时可以自定义处理数据格式 => { data: [], total: Number, currentPage: Number, pageSize: Number }
- pagination 分页参数，对应el-pagination所有api


4. 业务开发

editForm.js(x)

```javascript
import axios from 'axios'

export default {
  data () {
    return {
      params: {
        goodsName: 'goodsName',
        leimu: '1',
        priceMin: null,
        priceMax: null
      },
    }
  },
  mounted () {
  },
  methods: {
    del(data) {
      console.log(data)
    },
  },
  render (h) {
    const validatorPrice = (rule, val, callback) => {
      const { priceMin, priceMax } = this.params

      if (priceMin && priceMax && (Number(priceMin) > Number(priceMax) || priceMin === priceMax)) {
        return callback(new Error(`${priceMin} ~ ${priceMax} 价格区间有误`))
      }
      callback()
    }

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

    return (
      <div>
        <YForm value={this.params} label-width="100px" colon inline size="small">
          <YField name="goodsName" label="商品名称" />
          <YField name="leimu" label={
            <el-tooltip effect="dark" content="label 提示文字" placement="top-start">
              <span style="color: green" >类目<i class="el-icon-warning-outline"></i>：</span>
            </el-tooltip>
          } clearable component="el-select" dataSource={{
            1: '类目A', 2: '类目B'
          }} />
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
          <YButton do="submit" size="mini" />
          <YButton do="reset" size="mini" />

        </YForm>
        <YQueryTable
          style={{ marginTop: '20px' }}
          border
          columns={columns}
          serve={serve}
          ref="YQueryTable"
          onSelectionChange={() => {
            console.log('onSelectionChange')
          }}
          onSelect={() => {
            console.log('select 1')
          }}
        />
      </div>
    )
  }
}

```

### TODO

- 原生form控件支持
- queryTable 竟态处理
- select类 dataSource处理
- 完全支持template写法
- 文档完善
