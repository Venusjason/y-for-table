// import Form from '../packages/Form'
// import YField from '../packages/YField'

export default {

  data() {
    return {
      value: {
        name: '张三',
        age: 12,
        money: 100,
      }
    }
  },

  render(h) {
    return (
      <YForm value={this.value} action="11" style="margin-top: 40px" >
        <p>iview form 示例</p>
        <YField label={'名称'} name="name" component={'i-input'} rules={[]} />
        <YField label={<span>年龄</span>} name="age" component={'i-input'} rules={['required', 'integer']} onBlur={(e) => {
          console.log('onBlur', e)
        }} />
        <YField name="money" component={'i-input'} >
          <div slot="label">金钱</div>
          <div slot="append">元</div>
        </YField>
      </YForm>
    )
  },
}