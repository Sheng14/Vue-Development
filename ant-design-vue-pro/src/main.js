import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Icon, Drawer, Radio, Menu, Input, Form, Select, LocaleProvider, Dropdown, DatePicker, ConfigProvider } from "ant-design-vue";
import Auth from './directive/auth';
import Authorized from './components/Authorized';
import VueI18n from 'vue-i18n';
import enUS from './locale/en_US';
import zhCN from './locale/zh_CN';
import queryString from 'query-string';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/github.css'; // 引入高亮代码需要的插件和对应样式
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
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(ConfigProvider);
Vue.use(Auth); // 指令可以use注册
Vue.component('Authorized', Authorized); // 组件则全局注册比较方便
Vue.use(VueI18n);
Vue.use(VueHighlightJS);
// Vue.use(antd);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2273479_4z4cywcvyvv.js', // 在阿里巴巴那里生成的在线链接
});
Vue.component('IconFont', IconFont); // 全局注册引入字体图标标签

const i18n = new VueI18n ({
  locale: queryString.parse(location.search).locale || 'zhCN', // 定义当前自定义组件使用的语言类型
  messages: { // 语言包们
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
