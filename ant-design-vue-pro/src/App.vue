<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US"; // 引入语言包
import moment from 'moment'; // 引入第三方库
import "moment/locale/zh-cn"; // 按需单独引入moment的中文包
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  watch: {
    "$route.query.locale": function(val) { // 根据路由的改变来改变语言类型
      this.locale = val === "zhCN" ? zhCN : enUS;
      moment.locale(val === "zhCN" ? "zh-cn" : "en"); // 修改相关第三方组件的语言类型
    }
  }
}
</script>

<style lang="less"></style>
