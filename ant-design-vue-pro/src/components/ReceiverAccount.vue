<template>
  <a-input-group compact>
    <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
        <a-select-option value="alipay">支付宝</a-select-option>
        <a-select-option value="bank" >银行帐户</a-select-option>
    </a-select>
    <a-input v-model="number" style="width: calc(100%-130px)" @change="handleNumberChange"></a-input>
  </a-input-group>
</template>

<script>
export default {
    props: {
        value: {
            type: Object // 接收父组件的类型和输入框的数字
        }
    },
    watch: {
        value(val) {
            Object.assign(this, val)
        }
    },
    data () {
        const { number, type } = this.value || {} // 没有从父组件拿到就默认是空对象
        return {
            type: type || "alipay",
            number: number || ""
        }
    },
    methods: {
        handleTypeChange (val) {
            this.$emit("change", { ...this.value, type: val })
        },
        handleNumberChange (e) {
            this.$emit("change", { ...this.value, number: e.target.value })
        }        
    }
}
</script>

<style>

</style>