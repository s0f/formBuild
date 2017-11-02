import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const formEdit = r => require.ensure([], () => r(require('../pages/home/formEdit')), 'formEdit');
const formHeader = r => require.ensure([], () => r(require('../pages/home/formHeader')), 'formHeader');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
const list = r => require.ensure([], () => r(require('../pages/list/list')), 'list');
const release = r => require.ensure([], () => r(require('../pages/release/release')), 'release');
// const review = r => require.ensure([], () => r(require('../pages/review/review')), 'review');

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: home,
            alias: '/index',
            redirect: '/formHeader',
            children: [
                {
                    path: 'formHeader',
                    name: 'formHeader',
                    component: formHeader
                },
                {
                    path: 'formEdit',
                    name: 'formEdit',
                    component: formEdit
                },
                {
                    path: 'list',
                    name: 'list',
                    component: list
                },
                {
                    path: 'formRelease',
                    name: 'formRelease',
                    component: release
                }
            ]
        }
        /*,{
            path: '/review/:id',
            name: 'review',
            component: review
        }*/
    ]
});

export default router;
