### YForm

* YForm 实对elemnt ui form 组件做了一层HOC实现，保留原有ui组件原有api基础上增加了几个api

| YForm        | el-form        | value   | 说明 |
| ------------- |:-------------:|   -----:| -----:|
| value      | model            |   Object| 表单值,替代elform的model |
| wrappedComponentRef| -      |   Function (formRef) => {} | 回调ref，返回form实例 |
| colon |  label-suffix      |    String/Boolean | label后缀 |
| formStatus | - | String | 表单态 edit、preview、disabled |