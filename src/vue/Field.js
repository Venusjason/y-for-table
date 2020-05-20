import { Vue } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { createFieldCore } from '../baseCore/core'

const VueField = Vue.extend({
  name: 'YFIELD',
  componentName: 'YFIELD',
  inject: ['YFORM'],
  props: {
    name: {
      type: String,
      required: false
    },
    label: {},
    component: {},
    yNative: {
      type: Boolean,
      default: false,
    },
    rules: {},
  },
  data() {
    return {
      fieldInstance: null,
      value: null,
      errorMsg: '',
    }
  },
  computed: {
    YForm() {
      const getParentForm = (context) => {
        let parent = context.$parent
        let parentName = parent && parent.$options && parent.$options.componentName
        while (parentName !== 'YFORM') {
          parent = parent && parent.$parent
        }
        return parent
      }
      return getParentForm(this)
    }
  },
  mounted() {
    this.initFieldInstance()
  },
  beforeDestroy() {
    this.fieldInstance.beforeFieldDestory()
  },
  methods: {
    initFieldInstance() {
      const { formInstance } = this.YFORM
      console.log(formInstance.id)
      const Field = createFieldCore(formInstance.id)
      this.fieldInstance = new Field({
        name: this.name,
        label: this.label,
        rules: this.rules || [],
      })
      this.fieldInstance.updateByInputChange = this.updateByInputChange
      this.fieldInstance.updateByChange = this.updateByChange
      this.fieldInstance.validateCallback = this.validateCallback
    },
    updateByInputChange(value) {
      this.value = value
    },
    updateByChange(value) {
      this.value = value
    },
    validateCallback(result) {
      this.errorMsg = result.errorMsg
    },
  },
  render(h) {
    const _this = this
    return (
      <div>
        <label>{this.label}</label>
        {
          h(this.component, {
            props: {
              value: _this.value
            },
            attrs: {
              value: _this.value
            },
            on: {
              input(e) {
                let value = e
                /**
                 * 原生事件
                 */
                if (_this.yNative) {
                  value = e.target.value
                }
                _this.fieldInstance.onFieldInputChange(value)
              }
            }
          })
        }
        <span style="color: red" >{this.errorMsg}</span>
      </div>
    )
  }
})

export default VueField
