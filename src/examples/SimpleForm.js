// import Form from '../packages/Form'
// import YField from '../packages/YField'
export default {

  data() {
    return {
      value: {
        name: '张三',
        age: '12',
        money: 100,
      },
      formRef: null,
    }
  },
  methods: {
    onSubmit() {
      this.formRef.validate(valid => {
        console.log(valid)
      })
    },
  },

  render(h) {
    return (
      <YForm value={this.value} action="11" colon label-width="120px" inline={false} wrappedComponentRef={e => { this.formRef = e }} form-status="preview" >
        <p>element-ui 示例</p>
        <YField label={'名称'} name="name" component={'el-input'} rules={[]} />
        <YField name="age" component={'el-input'} rules={[
          'required',
          'integer'
        ]}
        preview-value={val => (
          <div>{val}岁</div>
        )}
        onBlur={(e) => {
          console.log('onBlur', e)
        }} componentProps={{
          style: { width: '200px' }
        }}>
          <span slot="label">年龄1：</span>
        </YField>
        <YField name="money" component={'el-input'} label="金钱" preview-value={val => (`${val}元`)} >
          <div slot="append">元</div>
        </YField>

        <YButton style="color: red; border: 1px dotted blue;">查询</YButton>
        <YButton do="submit" size="mini" onClick={this.onSubmit} />
      </YForm>
    )
  },
}