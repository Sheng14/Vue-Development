import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 引用需要在初始化Store之前！！！
const store = new Vuex.Store({
  state: { // 存放数据
    count: 0 // 默认是0
  },
  mutations: { // 存放同步方法
    increament(state) {
      state.count ++
    }
  },
  actions: { // 存放异步之类的方法
    increament({ state }) {
      setTimeout(() => {
        state.count ++
      }, 500);
    }
  },
  getters: { // 缓存数据
    doubleCount (state) {
      return state.count * 2
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
