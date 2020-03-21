### YField

- 与YForm 同名的api 优先级必然高于YForm
- 为了简化使用时代码片段，这里将field 与 Input类组件合并为一个 YField 标签，field 与 Input类共同使用YField上的属性，因为field上一般不会有与Input类组件同名api
- class style 这类顶级属性会作用到YField上，也就意味着你无法设置Input类样式，后期会增加 componentProps 属性来将field 与 Input类属性显式隔离开
- YField 上的name 就是YField hoc组件代理的 component 组件的v-model

##### YFieldOpt
- 使用`Vue.use(YField, YFieldOpt)`时需要全局注册的组件

| YField opt  | value   | 说明 |
| ------------- |:-------------:|   -----:|
|registerComponents| object | 注入类Input组件，键名就是 YField component|
|defaultComponent| string | VNode | 可省略component时使用 |

```
<YField name="goodsName" component="el-input" />
// 简化版：只要在全局注册时声明了 YFieldOpt.defaultComponent 就可以省去了
<YField name="goodsName" />
```
| YField        | el-form-item        | value   | 说明 |
| ------------- |:-------------:|   -----:| -----:|
| label      | label            |   String / VNode| 可以传html片段的（VNode） |
| component |  -    | String/VNode | 表单域控件, 默认 el-input |
| component-props |  -    | Object | 类Input组件, 只会作用于component组件上, 会覆盖到Field上同名配置 |
| dataSource |  -   |  Object, Array | 每个配置项需要有 label/value 字段 |
| colon |  label-suffix      |    String/Boolean | label后缀 |
| formStatus | - | String | 表单域态 edit、preview、disabled |


#### 自定义表单控件使用

如果项目中有自定义表单控件，也是可以完全使用的,只有一个要求
- 必须已经实现了标准的 `v-model` api

```javascript
import MyInput from '@/components/MyInput.vue'

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
        <YField name="goodsName" component={MyInput} disabled clearable>
      </YForm>
    )
  }
}

```

template版本写法

```vue
<template>
<YForm :value="this.formValues">
  <YField name="goodsName" component="my-input" disabled clearable>
</YForm>
</template>
<script>
import MyInput from '@/components/MyInput.vue'

export default {
  components: {
    'my-input': MyInput
  },
  data() {
    return {
      formValues: {
        goodsName
      }
    }
  },
}
</script>
```