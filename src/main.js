// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Panel from './components/panel/panel'
import store from './store/'
// 为了能使用 this.$http.get
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 注册全局组件
Vue.component('Panel', Panel);

/* eslint-disable no-new */
new Vue({
  el: '#app',
    store,
  router,
  template: '<App/>',
  components: {App}
})
