
import { getType } from '../packages/utils'
import Field from './Field'

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

}