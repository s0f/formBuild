import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      alias: '/index'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
