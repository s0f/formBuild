/**
 * Created by 31602 on 2017/4/3.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import member from './modules/member';
import editor from './modules/editor';
import common from './common';

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
    isLoading: false, // 正在加载页面
    isUp: false,
    step: 1,
    elementPrefix: common.elementPrefix,
    elementList: [],
    formName: '新的表单',
    formDesc: '',
    activeComponentRef: -1, // 当前操作的元素的索引
    activeComponentName: '',
    activeComponentUUID: -1,
    activeComponent: null,
    globalSetting: {
        insertQuestionNumber: false
    },
    scoreList: ['start', 'love', 'parise', 'flower', 'progress', 'number'],
    loading: null
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        member,
        editor
    }
});