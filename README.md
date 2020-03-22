
## y-for-table
[详细文档](http://venusjin.gitee.io/y-for-table/guide/)

### 简介

y-for-table 是服务于vue生态中后台应用的解决方案，table查询式列表和表单是中后台领域的最常见场景：
#### 查询式table的组成：
  - queryForm 用来设置查询条件的表单
  - table 用来展示列表数据的组件
  - Pagination 用来设置分页条件的组件

  那么三者之间的关系如下
  ![Image from alias](../.vuepress/public/queryTable.png)

queryForm、Pagination产生查询列表的接口的查询条件，接口执行到服务端获取用于Table组件消费的list数据， 同时Pagination 需要数据总条数 total用于处理分页页码展示；

不论三个组件使用哪套UI库，关系大概就是这样，所以y-for-table内置的YQueryTable组件就是为了简化 查询式Table展示的场景，当然也不仅限于Table，只要是list展示都可以处理。

#### vue form

vue 提供了非常便捷的指令 `v-model`, 似乎开发vue的form比起react那一套要简洁不少。那么我们面临的业务表单往往不仅仅是`v-model`这么简单：

- 多字段联动
- 校验规则联动
- 动态增减项

以上3种往往是我们开发中最常见的场景，vue的template模板不能完全发挥出js的编程能力，往往我们采用的是表达式之外的放到methods中声明处理，一旦表单字段较多较复杂时，代码量变大，一个字段的处理要分散到多个method，难以维护。

y-for-table 内置YForm、YField,能够简化表单开发。YForm的方式：字段值处理将不再
交给字段的`v-model`来维护，统一将值的处理权交给Form层

 ![Image from alias](../.vuepress/public/form.png)

为了得到js的完全编程能力，YForm采用了vue 的jsx方式实现，使用vue内置的Provider、inject就可以很简单达到 跨dom层级与Field、表单控件的通讯能力;但是jsx写法是没有`v-`之类的指令能够使用的，我们采用了vue版本的hoc来拦截处理表单控件的`value`、`onInput`值和事件，就完全达到了将表单值交给Form层管理

第三方UI库的 表单控件都设计有`v-model`，所以可以无缝接入，第三方库表单控件的 api也会直接透传到 YField的component层，写法如下

```vue
import { Input } from 'element-ui'

export default {
  data() {
    return {
      formValues: {
        goodsName
      }
    }
  },
  render(h) {
    return (
      <YForm value={this.formValues}>
        <YField name="goodsName" component={Input} disabled clearable>
      </YForm>
    )
  }
}

```

### TODO

- 原生form控件支持
- queryTable 竟态处理
- select类 dataSource处理
- 完全支持template写法
- 增加 visibleValues api, 获取展示字段值集合
