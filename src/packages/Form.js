import { Path } from 'cool-path'
import { cloneDeep } from 'lodash'
import { getMySlots, getType } from './utils'

export default {
  name: 'YForm',
  props: [
    'value'
  ],
  provide() {
    return {
      YFORM: this
    }
  },
  data() {
    return {
      initValue: {},
      fields: [],
    }
  },
  mounted() {
    this.setInitValue()
  },
  methods: {
    onFieldAdd(field) {
      this.fields.push(field)
    },
    onFieldRemove(field) {
      if (field.name) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    },
    // 表单整体校验 获取校验结果
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        const l = this.fields.length
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === l) {
              // 全体都校验了
              resolve(valid)
              if (getType(callback) === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    },
    // 校验某些字段
    validateField(name, callback, trigger = '') {
      const field = this.fields.filter(field1 => field1.name === name)[0]
      if (!field) {
        throw new Error(`[Y-For-Table]: 不能匹配到${name}字段`)
      }
      // 执行 field.js 的 validate
      field.validate(trigger, callback)
    },
    // 内部方法
    clearValidate(names = []) {
      const type = getType(names)
      if (type === 'string' && type !== '') {
        names = [names]
      }
      const fields = this.fields.filter(field => names.includes(field.name))
      fields.forEach(field => {
        field.clearValidate()
      })
    },
    /**
     * 重置部分字段，不传则全部重置
     * @param {*string | array} names 键值
     */
    resetFields(names = []) {
      const type = getType(names)
      if (type === 'string' && type !== '') {
        names = [names]
      }
      if (names.length) {
        names.forEach(name => {
          const value = Path.getIn(this.initValue, name)
          Path.setIn(this.value, name, value)
        })
      } else {
        Object.assign(this.value, this.initValue)
      }
    },
    onValidate(name, isValid, message = null) {
      this.$emit('validate', {
        name,
        isValid,
        message,
      })
    },
    setInitValue() {
      Object.assign(this.initValue, cloneDeep(this.value))
    },
    setFieldValue(name, value) {
      Path.setIn(this.value, name, value)
    },
    /**
     * 返回字段值
     * @param {键值} name
     */
    getFieldValue(name) {
      return Path.getIn(this.value, name)
    },
    setFieldsValue(data) {
      Object.assign(this.value, data)
    },
  },
  render(h) {
    console.log(this)
    const slots = getMySlots(this, this)
    return h('form', {
      props: this.$props,
      attrs: this.$attrs,
      on: this.$listeners,
      // slots,
      ref: 'yform',
    }, slots)
  },
}