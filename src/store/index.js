/**
 * Created by 31602 on 2017/4/3.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
Vue.use(Vuex);

let state = {
    elementPrefix: 'E',
    elementList: [],
    activeComponentRef: -1,
    activeComponentName: '',
    activeComponent: null,
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});
