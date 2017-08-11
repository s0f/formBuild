/**
 * Created by 31602 on 2017/4/3.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
Vue.use(Vuex);

/**
 *
 * @type {{elementPrefix: string, elementList: Array, activeComponentRef: number, activeComponentName: string, activeComponent: null}}
 * elementList:[{
     *  element: "Einput",
     *  index: 0,
     *  property: {
     *
     *  }
 * }]
 */
let state = {
    step: 0,
    elementPrefix: 'E',
    elementList: [],
    activeComponentRef: -1,
    activeComponentName: '',
    activeComponent: null,
    globalSetting: {
        insertQuestionNumber: false
    }
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});
