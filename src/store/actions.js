/**
 * Created by 31602 on 2017/4/3.
 */

import axios from 'axios'

const actions = {
    recovery({ commit }, payload) {
        axios.get('https://easy-mock.com/mock/5961e71e9adc231f357c229e/example/from')
        .then(res=>{
            commit('recovery', {state: res.data.data, callback: payload.loadFormDataEd});
        })
        let a = [{"uuid":"fd0c6b713eb848768c1a3bb7f414c1cb","base":{"value":1,"name":"切换组件类型","title":"文本框","desc":"","data":[{"id":0,"value":1,"desc":"单行文本"},{"id":0,"value":2,"desc":"多行文本"}]},"limit":{"repeat":true},"style":{"layout":"transverse","width":"20"},"name":"文本框","type":"input","isChange":true,"index":1,"element":"Einput"},{"uuid":"f5273c45be9049bd80b62395db6764c0","base":{"value":1,"name":"切换组件类型","title":"选择","desc":"","data":[{"id":0,"value":1,"desc":"单选"},{"id":0,"value":2,"desc":"多选"}]},"limit":{"repeat":true},"style":{"layout":"transverse"},"name":"选择","type":"radio","isChange":true,"selects":{"title":"选项内容","value":1,"count":3,"data":[{"id":0,"value":1,"desc":"选项1"},{"id":1,"value":2,"desc":"选项2"},{"id":2,"value":3,"desc":"选项3"}]},"index":0,"element":"Eradio"},{"uuid":"f9b100e5f33240e1ae7e64504325e0ee","base":{"value":1,"title":"下拉","desc":""},"limit":{"repeat":true},"style":{"layout":"transverse"},"name":"下拉选择","type":"select","selects":{"title":"切换组件类型","value":1,"count":3,"data":[{"id":0,"value":1,"desc":"选项1"},{"id":1,"value":2,"desc":"选项2"},{"id":2,"value":3,"desc":"选项3"}]},"index":2,"element":"Eselect"}];
        let dragState = [{"top":126,"right":1385.5,"bottom":210,"left":587.5,"width":798,"height":84},{"top":210,"right":1385.5,"bottom":340,"left":587.5,"width":798,"height":130},{"top":340,"right":1385.5,"bottom":422,"left":587.5,"width":798,"height":82}];
    }
}

export default actions;
