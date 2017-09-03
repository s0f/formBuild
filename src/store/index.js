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
    isUp: false,
    step: 1,
    elementPrefix: 'E',
    elementList: [],
    activeComponentRef: -1, // 当前操作的元素的索引
    activeComponentName: '',
    activeComponentUUID: -1,
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
