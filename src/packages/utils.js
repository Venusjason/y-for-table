export const isVnode = (h, component) => {
  const Vnode = h('div', '').constructor
  return component instanceof Vnode
}

export const getType = (data) => {
  const val = Object.prototype.toString.call(data)
  return val.match(/\[object (.*?)\]/)[1].toLowerCase()
}

export const filterAttrs = (detail = {}) => {
  const keys = Object.keys(detail)
  const attrs = {}

  keys.forEach(key => {
    const value = detail[key]

    if (
      typeof value === 'number'
      || typeof value === 'string'
      || typeof value === 'boolean'
    ) {
      attrs[key] = value
    }
  })

  return attrs
}

/**
 * @param {*} str 驼峰命名 => 连接符格式字符串
 * 返回 连接符格式字符串
 */
export const dasherize = (str) => str.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()

export const getParentForm = (context) => {
  let parent = context.$parent
  let parentName = parent && parent.$options && parent.$options.componentName
  while (parentName !== 'ElForm') {
    if (parentName === 'ElFormItem') {
      // this.isNested = true;
    }
    parent = parent && parent.$parent
    // 为了兼容按钮在form之外不报错
    if (!parent) {
      return null
      // eslint-disable-next-line no-unreachable
      break
    }
    parentName = parent && parent.$options && parent.$options.componentName
  }
  return parent && parent.$parent
}

// 找到最近的 YQueryTable
export const getLatestYQueryTable = (context) => {
  let parent = context.$parent
  let children = parent.$children || []
  let matchedTable = children.filter(child => child && child.$options && ((child.$options.componentName === 'YQueryTable' || child.$options.name === 'YQueryTable')))
  while (matchedTable.length === 0) {
    parent = parent.$parent
    // 防止context渲染时 YQueryTable 尚未实例化
    if (!parent) {
      return null
      // eslint-disable-next-line no-unreachable
      break
    }
    children = parent.$children || []
    matchedTable = children.filter(child => child && child.$options && (child.$options.componentName === 'YQueryTable' || child.$options.name === 'YQueryTable'))
  }
  return matchedTable[0]
}


export const getMySlots = (fieldContext, context, slotName = '*') => {
  const slotNames = slotName.split(',')

  const keys = Object.keys(fieldContext.$slots)
  const acceptKeys = keys.filter(key => slotName === '*' || slotNames.includes(key))

  return acceptKeys.reduce((arr, key) => arr.concat(fieldContext.$slots[key]), []).map(vnode => {
    vnode.context = context._self
    return vnode
  })
}