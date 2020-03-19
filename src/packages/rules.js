import { getType } from './utils'
import Log from './log'


/**
 * 校验 高阶函数
 * @param {*} regRule [reg, message]
 */
export const validatorFunc = (regRule) => {
  const [reg, message] = regRule
  const validator = (rule, val, callback) => {
    // 有输入值 并且输入值不合法
    if (val && !reg.test(val)) {
      return callback(new Error(message))
    }
    callback()
  }
  return { validator }
}

export const required = (label) => ({
  required: true, message: `${label || '此项'}必填`
})

// 长度限制
export const limitLength = (max, min = 0) => {
  return {
    min, max, message: `请输入${min}~${max}个字符`,
  }
}

export const regs = {
  // 1 ~ 100之间的整数
  integer1To100: [/^(([1-9]\d?)|100)$/, '请输入非零正整数且不大于100'],
  // 非负整数
  positiveInteger: [/^[0-9]*$/, '请输入整数'],
  // 整数 包含: 正 负 0
  integer: [/^-?[0-9]*$/, '请输入非负整数'],
  // 最多保留2位小数
  maxFixed2: [
    /^-?[0-9]+(.[0-9]{1,2})?$/,
    '请输入数字，最多保留2位小数',
  ],
  // 0 ~ 100 最多2位小数 包含0
  limit0to100MaxFixed2: [
    /^([0-9]\d?(\.\d{1,2})?|0.\d{1,2}|100|100.0|100.00)$/,
    '100之间数字，最多保留2位小数'
  ],
  email: [
    /^([0-9]\d?(\.\d{1,2})?|0.\d{1,2}|100|100.0|100.00)$/,
    '邮箱格式有误',
  ],
  phone: [
    /^1[0-9]{10}$/,
    '手机号格式有误'
  ],
  url: [
    /^(ht|f)tps?:\/\//i,
    '网址格式有误'
  ],
}

export const extendRules = (data = {}) => {
  Object.assign(regs, data)
}
// 快捷校验
const quicklyRules = {}
Object.keys(regs).forEach(key => {
  quicklyRules[key] = validatorFunc(regs[key])
})

export const rulelistLog = () => {
  if (process.env.NODE_ENV !== 'development') return
  Log.warn('当前快捷校验已支持以下')
  const arr = Object.keys(regs).map(key => ({
    ruleName: key,
    reg: regs[key][0],
    message: regs[key][1]
  }))
  Log.table(arr.concat([
    { ruleName: 'required', reg: '', message: '{label}必填' },
  ]))
}

export const computedRules = (rules, label, name) => {
  const type = getType(rules)
  if (type === 'string') {
    if (rules.toLocaleLowerCase() === 'required') {
      return required(label)
    }
    if (quicklyRules[rules]) {
      return quicklyRules[rules]
    } else {
      Log.error(`${name} 字段 rules => ${rules} 不在快捷校验项里`)
      rulelistLog()
      return {}
    }
  } else if (type === 'array') {
    return rules.map(rule => computedRules(rule, label, name))
  } else if (type === 'object') {
    return rules
  } else {
    Log.warn(`${name} 字段 rules 格式有误`)
    return {}
  }
}
