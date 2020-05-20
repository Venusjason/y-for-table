import {
  IForm, IField, IFormFieldItem, ITrigger
} from './interfaces'

export default class Field implements IField {
  formInstance: IForm

  name: string = ''

  value: any = undefined

  rules: [] = []

  label: string = ''

  constructor(opt: IFormFieldItem, form: IForm) {
    this.name = opt.name
    this.formInstance = form
    this.LIFECYCLE_INIT()
  }


  /**
   * 字段初始化
   */
  LIFECYCLE_INIT() {
    this.formInstance.addField(this)
  }

  /**
   * 交互触发
   */
  LIFECYCLE_INPUT_CHANGE(value: any) {
    this.formInstance.onFieldChange(this.name, value)
  }

  /**
   * 字段状态发生变化时触发 外部更新导致
   */
  LIFECYCLE_CHANGE(value: any) {
    this.value = value
  }

  /**
   * 校验时触发
   */
  LIFECYCLE_VALIDATE() {
    console.log(this)
  }

  /**
   * 字段挂载时触发
   */
  LIFECYCLE_MOUNT() {
    console.log(this)
  }

  /**
   * 字段卸载时触发
   */
  LIFECYCLE_UN_MOUNT() {
    this.formInstance.removeField(this)
  }

  validate(trigger: ITrigger, callback: Function) {
    this.LIFECYCLE_VALIDATE()
  }
}
