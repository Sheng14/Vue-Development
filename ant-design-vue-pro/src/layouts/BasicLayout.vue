<template>
<div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
  <a-layout class="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible :trigger=null :theme="navTheme" v-if="navLayout === 'left'">
      <div class="logo">Ant Design Pro</div>
      <SliderMenu :theme="navTheme" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
      <a-icon
        v-auth="['admin']"
        class="trigger"
        :type="collapsed ? 'menu-fold': 'menu-unfold'"
        @click="collapsed = !collapsed"
      ></a-icon>
      <Header />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <Authorized :authority="['admin']">
    <SettingDrawer />
  </Authorized>
</div>
</template>

<script>
import SliderMenu from './SliderMenu.vue';
import Header from './Header';
import Footer from './Footer';
import SettingDrawer from '../components/SettingDrawer/index';
import Authorized from '../components/Authorized.vue';
export default {
    data() {
        return {
        collapsed: false, // 控制页面是否左缩
        };
    },
    components: {
        Header,
        Footer,
        SliderMenu,
        SettingDrawer,
        Authorized
    },
    computed: {
        navTheme () {
            return this.$route.query.navTheme || 'dark'
        },
        navLayout () {
            return this.$route.query.navLayout || 'left'
        }
    }
}
</script>

<style scoped>
.components-layout-demo-side >>> .ant-menu-dark .ant-menu-item-selected {
  color: darkseagreen;
}
.trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
}
.trigger:hover {
    background-color: #eee;
}
.logo {
    height: 64px;
    line-height: 32px;
    text-align: center;
    overflow: hidden;
}
.nav-theme-dark >>> .logo {
    color: #ffffff;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>