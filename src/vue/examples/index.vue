<template>
<div>
  <Form :value="formValues" ref="form1">
    <div>11</div>
    <Field  v-for="(val, key) in formValues" :name="key" component="input" :yNative="true" :rules="rules.name" :key="key" :label="key" />
    <Field name="name" component="input" :yNative="true" />
    <Field name="age" component="input" :yNative="true" v-if="formValues.name == '22'" />
  </Form>
  <pre>{{JSON.stringify(formValues, null, 2)}}</pre>
  <Form :value="formValues2">
    <div>11</div>
    <Field name="name" component="input" :yNative="true" />
  </Form>
</div>
</template>
<script>
import Form from '../Form'
import Field from '../Field'

const data1 = {}
for (let i = 0; i < 10; i++) {
  data1[`key_${i}`] = ''
}

export default {
  components: {
    Form,
    Field,
  },
  data () {
    return {
      formValues: {
        name: '我是张三',
        age: null,
        ...data1,
      },
      formValues2: {
        name: '我是李四'
      },
      rules: {
        name: [
          { required: true },
          {
            validator: (rule, val, callback) => {
              if (/^(([1-9]\d?)|100)$/.test(val)) {
                return callback()
              } else {
                return callback(new Error('输入有误'))
              }
            }
          }
        ]
      }
    }
  },
  computed: {},
  mounted () {
    setTimeout(() => {
      // this.formValues = {
      //   ...this.formValues,
      //   name: '嘎嘎'
      // }
      this.formValues.name = '嘎嘎'
    }, 1000)
    // console.log(this.$refs.form1.formInstance)
  },
  methods: {},
}
</script>
<style>
</style>
