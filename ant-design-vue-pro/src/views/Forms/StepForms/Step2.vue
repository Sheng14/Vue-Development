<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{step.payAccount}}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: [{ required: true,  message: '请输入密码' }]
            }
          ]"
          type="password"
          placeholder="请输入密码"
        >  
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 8px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  computed: {
    step () {
      return this.$store.state.form.step
    }
  },
  methods: {
    onPrev () { // 返回上一页
      this.$router.push('/form/step-form/info')
    },
    handleSubmit () {
      const { form, step, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({ // 异步操作，交给actions去修改state和路由跳转
            type: 'form/submitStepForm',
            payload: { ...step, ...values }
          });
        }
      })
    }
  }
}
</script>

<style>

</style>