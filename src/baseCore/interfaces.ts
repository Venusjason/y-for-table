import { RuleItem } from 'async-validator'

export interface IFormState {
  fields: IFormFieldItem[];
  value: {
    [fieldName: string]: any;
  }
}

export type ITrigger = '' | 'blur' | 'change'

export interface IFormFieldItem {
  name: string,
  value: any,
  rules?: RuleItem[],
  label?: string | any,
  component?: any,
  dirty?: boolean;
  touched?: boolean;
  visited?: boolean;
  error?: string | undefined;
}

export interface IForm {
  value: {},
  fields: IField[],
  addField(field: IField): void;
  removeField(field: IField): void;
  onFieldChange(name: String, value: any): void;
  notifyField(name: string | string[], value: any): void;

}

export interface IField {
  formInstance: any,
  name: string,
  value: any,
  rules: [],
  label: string,

  /**
   * 字段初始化
   */
  LIFECYCLE_INIT(): void;

  /**
   * 字段状态发生变化时触发 外部更新导致
   */
  LIFECYCLE_CHANGE(value: any): void;

  /**
   * 校验时触发
   */
  LIFECYCLE_VALIDATE(): void;

  /**
   * 字段挂载时触发
   */
  LIFECYCLE_MOUNT(): void;

  /**
   * 字段卸载时触发
   */
  LIFECYCLE_UN_MOUNT(): void;

}