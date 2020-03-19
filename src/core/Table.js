import { Table, TableColumn } from 'element-ui'
import { dasherize } from './utils'

const ELTable = Table
const ELTableColumn = TableColumn

const YTable = {
  name: 'YTable',
  functional: true,
  props: {
    ...ELTable.props,
    columns: {
      type: Array,
      default: () => [],
    },
  },
  render(h, context) {
    const { columns, ...props } = context.props
    const renderColomns = columns.map((column, i) => {
      const { render, ...rest } = column
      return h(ELTableColumn, {
        props: rest,
        key: i + (column.prop || ''),
        scopedSlots: render && {
          default: columnProps => render(columnProps)
        }
      })
    })
    const events = {}
    Object.keys(context.listeners || {}).forEach(key => {
      events[dasherize(key)] = context.listeners[key]
    })
    return h(ELTable, {
      props: {
        ...props,
      },
      on: events,
      ref: context.data.ref || 'YTable'
    }, renderColomns)
  }
}

YTable.install = function(Vue) {
  Vue.component(YTable.name, YTable)
}

export default YTable