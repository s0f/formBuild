/**
 * Created by 31602 on 2017/11/1.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Review from './pages/review/review'
import axios from 'axios'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'


// 为了能使用 this.$http.get
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<Review/>',
    components: {Review}
})
