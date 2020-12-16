import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Icon, Drawer, Radio, Menu, Input, Form, Select } from "ant-design-vue";
import Auth from './directive/auth';
import Authorized from './components/Authorized';
// import antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Form);
Vue.use(Select);
Vue.use(Auth); // 指令可以use注册
Vue.component('Authorized', Authorized); // 组件则全局注册比较方便
// Vue.use(antd);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2273479_4z4cywcvyvv.js', // 在阿里巴巴那里生成的在线链接
});
Vue.component('IconFont', IconFont); // 全局注册引入字体图标标签

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
