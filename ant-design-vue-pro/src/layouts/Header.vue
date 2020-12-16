<template>
  <div class="header">
      <a-dropdown>
        <a>
          语言切换 <a-icon type="global" />
        </a>
        <a-menu slot="overlay" @click="localeChange" :selectedKeys="[$route.query.locale || 'zhCN']">
          <a-menu-item key="zhCN">
            <a>中文</a>
          </a-menu-item>
          <a-menu-item key="enUS">
            <a>English</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    localeChange ({ key }) { // 拿到选择item的key来改变路由，而路由一旦改变就会被APP.vue监听到就能改变语言类型了
      this.$router.push({ query: { ...this.$route.query, locale: key } })
      this.$i18n.locale = key // 修改自定义组件的语言类型
    }
  }
}
</script>

<style scoped>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>