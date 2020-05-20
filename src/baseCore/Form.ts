// import AsyncValidator from 'async-validator'
import Path from 'cool-path'
import { getType } from '../packages/utils'
import {
  ITrigger, IField, IForm, IFormFieldItem
} from './interfaces'
import EventEmiter from './EventEmiter'


export default class Form implements IForm {
  value: {} = {}

  fields: IField[] = []

  constructor(state: {}) {
    this.value = state || {}
  }

  LIFECYCLE_ON_INIT() {
    console.log(this)
  }

  addField(field) {
    const fieldValue = Path.getIn(this.value, field.name)
    console.log(fieldValue)
    field.LIFECYCLE_CHANGE(fieldValue)
    this.fields.push(field)
    field.LIFECYCLE_MOUNT()
    // TODO: 赋值
    // this.value[field.name] = undefined
  }

  removeField(field: IField) {
    this.fields = this.fields.filter(fieldItem => {
      const isMatch = fieldItem === field
      if (isMatch) {
        field.LIFECYCLE_UN_MOUNT()
      }
      return !isMatch
    })
  }

  setFieldValue(name: string, value: any) {
    this.value[name] = value
  }

  onFieldChange(name: string, value: any) {
    this.value[name] = value
    this.notifyField(name, value)
  }

  notifyField(name: string | string[], value: any) {
    const type = getType(name)
    this.fields.forEach(field => {
      if (type === 'array') {
        if (name.indexOf(field.name) > -1) {
          field.LIFECYCLE_CHANGE(value)
        }
      } else if (type === 'string') {
        if (name === field.name) {
          field.LIFECYCLE_CHANGE(value)
        }
      } else {
        field.LIFECYCLE_CHANGE(value)
      }
    })
  }

  /**
   * 校验field
   */
  validateField(name: string, trigger: ITrigger, callback: Function) {
    const fields = this.fields.filter(field => field.name === name)
    if (fields.length === 0) return
    fields.forEach(field => {
      this.validate(field)
    })
  }

  validate(field: IField) {
    console.log(this)
    const { rules, value } = field
    const descriptor = {}
    // const rules1 = (rules || []).map(rule => {
    //   const { trigger, ...rest } = rule
    //   return rest
    // })
  }
}

export const eventEmiter = new EventEmiter()

class FormCore {
  value = {}

  fields = []

  constructor() {
    /**
     * 表单域注册
     */
    eventEmiter.on('FIELD_REGISTER', function(field) {
      console.log('FIELD_REGISTER', field)
      this.fields.push(field)
    })
    /**
     * 输入更新
     */
    eventEmiter.on('FIELD_INPUT_CHANGE', function(data) {
      console.log(data)
    })
    /**
     * 外部更新导致数据更细
     */
    eventEmiter.on('FIELD_CHANGE', function(data) {
      console.log('FIELD_CHANGE')
    })
    /**
     * 销毁
     */
    eventEmiter.on('FIELD_DESTORY', function(data) {
      console.log('FIELD_DESTORY')
    })
  }
}
class FieldCore {
  name: string = ''

  value: any = undefined

  rules: [] = []

  label: string = ''

  constructor (opt: IFormFieldItem) {
    this.name = opt.name
    eventEmiter.emit('FIELD_REGISTER', this)
  }

  onFieldInputChange(value: any) {
    eventEmiter.emit('FIELD_INPUT_CHANGE', {
      name: this.name,
      value,
    })
  }

  /**
   * 外部更新导致数据更细
   */
  onFieldChange(value: any) {
    eventEmiter.emit('FIELD_CHANGE', {
      name: this.name,
      value,
    })
  }

  beforeFieldDestory() {
    eventEmiter.emit('FIELD_DESTORY', this)
  }
}