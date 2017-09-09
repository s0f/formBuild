import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const formHeader = r => require.ensure([], () => r(require('../pages/home/formHeader')), 'formHeader');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
const list = r => require.ensure([], () => r(require('../pages/list/list')), 'list');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: formHeader,
      alias: '/index'
    },
    {
      path: '/formHeader',
      name: 'formHeader',
      component: formHeader
    },
    {
        path: '/list',
        name: 'list',
        component: list
    },
    {
      path: '/formEdit',
      name: 'formContent',
      component: home
    }
  ]
})
