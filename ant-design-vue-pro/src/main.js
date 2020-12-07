import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button } from "ant-design-vue";
// import antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";

Vue.config.productionTip = false;
Vue.use(Button);
// Vue.use(antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");