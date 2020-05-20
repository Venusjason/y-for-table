import Path from 'cool-path'
import AsyncValidator, { RuleItem } from 'async-validator'
import { isEqualWith } from 'lodash'
import { getType } from '../packages/utils'
import {
  IFormFieldItem, ITrigger
} from './interfaces'
import EventEmiter from './EventEmiter'

interface IRuleItem extends RuleItem {
  trigger?: ITrigger | ITrigger[]
}

let id = 0

export const eventEmiter = new EventEmiter()

const eventName = (name, formKey) => `${name}_${formKey}`

const getNameValue = (...args) => {
  if (args.length === 1 && getType(args[0]) === 'object') {
    return args[0]
  } else if (args.length === 2 && getType(args[0]) === 'string') {
    return {
      name: args[0],
      value: args[1],
    }
  } else {
    console.error('参数格式有误')
  }
}

export class FormCore {
  id = id

  value = {}

  fields: {} = {}

  isFieldUpdating: Boolean = false

  constructor(value) {
    id++
    console.log(JSON.stringify(value))
    this.value = value
    /**
     * 表单域注册
     */
    eventEmiter.on(this.setEventName('FIELD_REGISTER'), this.fieldRegister.bind(this))
    /**
     * 输入更新
     */
    eventEmiter.on(this.setEventName('FIELD_INPUT_CHANGE'), this.fieldInputChange.bind(this))
    /**
     * 外部更新导致数据更细
     */
    eventEmiter.on(this.setEventName('FIELD_CHANGE'), this.fieldChange.bind(this))
    /**
     * 销毁
     */
    eventEmiter.on(this.setEventName('FIELD_DESTORY'), this.fieldDestory.bind(this))
  }

  observerValue(data) {

  }

  updateFormValues(value) {
    // 外部赋值进来 才执行
    if (this.isFieldUpdating) {
      this.isFieldUpdating = false
      return
    }
    console.log('updateFormValues')
    this.value = value
    this.notifyAll()
  }

  setFieldValue(name: string, value: any) {
    Path.setIn(this.value, name, value)
    this.notifyField(name, value)
  }

  setEventName(name: String) {
    return eventName(name, this.id)
  }

  fieldRegister(field) {
    console.log('FIELD_REGISTER', this)
    const value = Path.getIn(this.value, field.name)
    if (this.fields[field.name]) {
      this.fields[field.name].push(field) 
    } else {
      this.fields[field.name] = [field]
    }
  }

  fieldInputChange(data) {
    const { name, value } = getNameValue(data)
    this.isFieldUpdating = true
    Path.setIn(this.value, name, value)
    this.notifyField(name, value)
  }

  fieldChange(data) {
    const { name, value } = getNameValue(data)
    console.log('FIELD_CHANGE', name, value)
  }

  fieldDestory(field) {
    console.log('FIELD_DESTORY', field)
    if (field.name) {
      this.fields[field.name] = this.fields[field.name].filter(f => f !== field)
    }
  }

  notifyField(name: string, value: any) {
    const type = getType(name)
    this.fields[name].forEach(field => {
      field.value = value
      field.updateByInputChange(value)
      field.validate('change')
    })
  }

  notifyAll() {
    Object.keys(this.fields).forEach(fieldName => {
      this.fields[fieldName].forEach(field => {
        const value = Path.getIn(this.value, field.name)
        if (!isEqualWith(field.value, value)) {
          field.value = value
          field.updateByChange(value)
          field.validate()
        }
      })
    })
  }

  /**
   * 表单卸载前
   */
  beforeDestroy() {
    const names = [
      'FIELD_REGISTER',
      'FIELD_INPUT_CHANGE',
      'FIELD_CHANGE',
      'FIELD_DESTORY',
    ]
    names.forEach(name => {
      eventEmiter.off(this.setEventName(name))
    })
  }
}

export const createFieldCore = (formId) => {
  return class FieldCore {
    name: string = ''
  
    value: any = undefined
  
    rules: IRuleItem[] = []
  
    label: any = ''

    updating: Boolean = false

    validateState: 'validating' | 'success' | 'error' | '' = ''

    validateMessage: string = ''
  
    constructor (opt: IFormFieldItem) {
      this.name = opt.name
      this.rules = opt.rules || []
      this.label = opt.label
      eventEmiter.emit(eventName('FIELD_REGISTER', formId), this)
    }
  
    onFieldInputChange(value: any) {
      eventEmiter.emit(eventName('FIELD_INPUT_CHANGE', formId), {
        name: this.name,
        value,
      })
    }
  
    /**
     * 外部更新导致数据更新
     */
    onFieldChange(value: any) {
      eventEmiter.emit(eventName('FIELD_CHANGE', formId), {
        name: this.name,
        value,
      })
    }
  
    beforeFieldDestory() {
      eventEmiter.emit(eventName('FIELD_DESTORY', formId), this)
    }

    getFilteredRule(trigger: ITrigger) {
      return this.rules.filter(rule => {
        if (!rule.trigger) {
          return true
        }
        if (getType(rule.trigger) === 'array') {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
    }

    validate(trigger: ITrigger, callback) {
      const { value } = this
      const rules = this.getFilteredRule(trigger)
      if (rules.length === 0) {
        callback && callback()
        return true
      }
      const descriptor = {}
      descriptor[this.name] = rules.map(rule => {
        const { trigger: t, ...rest } = rule
        return {
          ...rest
        }
      })
      this.validateState = 'validating'
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.name] = value
      validator.validate(
        { [this.name]: value },
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = errors ? 'error' : 'success'
          this.validateMessage = errors ? errors[0].message : ''
          callback && callback(this.validateMessage, invalidFields)
          this.validateCallback({
            errorMsg: this.validateMessage,
            state: this.validateState
          })
        }
      )
    }

    updateByInputChange() {}
  
    updateByChange() {}

    validateCallback(data: {
      errorMsg: string,
      state: string,
    }) {}
  }
}
