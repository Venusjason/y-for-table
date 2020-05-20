import { Vue } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { FormCore } from '../baseCore/core'

const VueForm = Vue.extend({
  name: 'YFORM',
  componentName: 'YFORM',
  provide() {
    return {
      YFORM: this,
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  watch: {
    value: {
      deep: true,
      handler: function (val) {
        this.formInstance.updateFormValues(val)
      }
    }
  },
  data() {
    return {
      formInstance: new FormCore(this.value),
      formValues: {}
    }
  },
  mounted() {
    this.initForm()
  },
  beforeDestroy() {
    this.formInstance.beforeDestroy()
  },
  methods: {
    initForm() {
      this.formInstance.updateFormValues(this.value)
    }
  },
  render(h) {
    return h('form', {
      attrs: this.$attrs,
      ref: 'form',
    }, [
      this.$slots.default,
      (
        <div>{this.formInstance.id}</div>
      )
    ])
  }
})

export default VueForm