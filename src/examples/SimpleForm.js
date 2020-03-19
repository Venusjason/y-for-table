// import Form from '../packages/Form'
// import YField from '../packages/YField'
export default {

  data() {
    return {
      value: {
        name: '张三',
        age: '12',
        money: 100,
      }
    }
  },

  render(h) {
    return (
      <YForm value={this.value} action="11" colon label-width="120px" inline={false} >
        <p>element-ui 示例</p>
        <YField label={'名称'} name="name" component={'el-input'} rules={[]} />
        <YField label={<span>年龄</span>} name="age" component={'el-input'} rules={[
          'required',
          'integer'
        ]} onBlur={(e) => {
          console.log('onBlur', e)
        }} componentProps={{
          style: { width: '200px' }
        }}/>
        <YField name="money" component={'el-input'} label="金钱" >
          <div slot="append">元</div>
        </YField>

        <YButton style="color: red; border: 1px dotted blue;">查询</YButton>
        <YButton do="submit" size="mini" />
      </YForm>
    )
  },
}