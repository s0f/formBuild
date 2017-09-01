/**
 * Created by 31602 on 2017/4/3.
 */
const actions = {
    recovery({commit}) {
        let a = [{ "uuid": "c1a1275371b5435ba3c09f2cc298b5bc", "base": { "value": 2, "name": "切换组件类型", "title": "输入你的理想", "desc": "写不出瞎扯也行", "data": [{ "id": 0, "value": 1, "desc": "单行文本" }, { "id": 0, "value": 2, "desc": "多行文本" }] }, "limit": { "repeat": true }, "style": { "layout": "transverse", "width": "20" }, "name": "文本框", "type": "input", "isChange": true, "index": 0, "element": "Einput" }, { "uuid": "a91c3429e5d341db8f1764f7a82b96d7", "base": { "value": 1, "name": "切换组件类型", "title": "选择你最喜欢的AV女星", "desc": "", "data": [{ "id": 0, "value": 1, "desc": "单选" }, { "id": 0, "value": 2, "desc": "多选" }] }, "limit": { "repeat": true }, "style": { "layout": "transverse" }, "name": "选择", "type": "radio", "isChange": true, "selects": { "title": "选项内容", "value": "xxxx", "count": 3, "data": [{ "id": 0, "value": 1, "desc": "苍井空" }, { "id": 1, "value": 2, "desc": "小泽玛莉亚" }, { "id": 2, "value": 3, "desc": "xxxx" }] }, "index": 1, "element": "Eradio" }, { "uuid": "e24f0edd2a1f451b895b08ff17c5913a", "base": { "value": 1, "title": "选择密码加密方法", "desc": "" }, "limit": { "repeat": true }, "style": { "layout": "transverse" }, "name": "下拉选择", "type": "select", "selects": { "title": "切换组件类型", "value": "不加密", "count": 3, "data": [{ "id": 0, "value": 1, "desc": "MD5" }, { "id": 1, "value": 2, "desc": "MD5+" }, { "id": 2, "value": 3, "desc": "不加密" }] }, "index": 2, "element": "Eselect" }];
        commit('recovery', {elementList: a});
    }
}

export default actions;