
import AsyncValidator from 'async-validator'
import { getType } from '../packages/utils'
import Field, { ITrigger } from './Field'

export interface IFormState {
  fields: IFormFieldItem[];
  value: {
    [fieldName: string]: any;
  }
}



export default class Form {

  value: IFormState['value'] = {}
  fields: Field[] = []

  constructor(state?: IFormState['value']) {
    this.value = state || {}
  }

  addField(field: Field) {
    this.fields.push(field)
    // TODO: 赋值
    this.value[field.name] = undefined
  }

  removeField(name: string) {
    this.fields = this.fields.filter(ele => ele.name !== name)
  }

  onFieldChange(name: string, value: any) {
    this.value[name] = value
    this.notifyField(name)
  }

  notifyField(name?: string | string[]) {
    const type = getType(name)
    this.fields.forEach(field => {
      if (type === 'array') {
        if (name.indexOf(field.name) > -1) {
          field.update()
        }
      } else if (type === 'string') {
        if (name === field.name) {
          field.update()
        }
      } else {
        field.update()
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

  validate(field: Field) {
    const { rules, value } = field
    const descriptor = {}
    const rules1 = (rules || []).map(rule => {
      const { trigger, ...rest } = rule
      return rest
    })
  }

}