<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true,  message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账户"
        >  
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: { // 定义布局样式
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  computed: { // 从vuex中获取数据（因为可能变更什么的所以采用计算属性）
    step () {
      return this.$store.state.form.step
    }
  },
  methods: {
    handleSubmit () { // 下一步
      const { form, $router, $store } = this; // 直接拿出来不用一个个取
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({ // 直接提交修改state
            type: 'form/saveStepFormData',
            payload: values
          });
          $router.push("/form/step-form/confirm")
        }
      })
    }
  }
}
</script>

<style>

</style>