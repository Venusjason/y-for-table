import Form from './Form'

export interface IFormFieldItem {
  name: string,
  value: any,
  rules?: [],
  label?: string | any,
  component?: any,
  dirty?: boolean;
  touched?: boolean;
  visited?: boolean;
  error?: string | undefined;
}

export default class Field {

  formInstance: Form

  name: string = ''
  value: any = undefined
  rules: [] = []
  label: string = ''

  constructor(opt: IFormFieldItem, form: Form) {
    this.name = opt.name
    form.addField(this)
    this.formInstance = form
  }

  update() {
    this.value = this.formInstance.value[this.name]
  }

  onChange(value: any) {
    this.formInstance.onFieldChange(this.name, value)
  }

}