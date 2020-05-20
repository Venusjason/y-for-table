import { RuleItem } from 'async-validator'

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