### YButton

- YButton 组件就是Button的增强，他会自动寻找到上下文中最近的YForm、YQueryTable 自动执行查询、重置功能
- do=submit 会自动触发列表查询接口
- do=reset 就是表单重置到初始值并触发列表查询接口
- CreateYButton 是一个创建YButton组件的高阶函数，内置了点击事件处理
- YButton 示搭配 YQueryTable使用的，其他场景没有特殊功能