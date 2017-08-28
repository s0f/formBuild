const elementTypes = ['Einput', 'Eradio', 'Eselect'];
const elementBaseProperty = {
    // 基础设置
    base: {
        required: false
    },
    // 填写设置
    limit: {
        repeat: true
    },
    // 外观样式
    style: {}
};
const elementProperty = {
    'Einput': {
        name: '文本框',
        type: 'input',
        isChange: true,
        base: {
            value: 1,
            name: '切换组件类型',
            title: '文本框',
            desc: '',
            data: [
                {id:0, value: 1, desc: '单行文本'},
                {id:0, value: 2, desc: '多行文本'}
            ]
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        }
    },
    'Eradio': {
        name: '选择',
        type: 'radio',
        isChange: true,
        base: {
            value: 1,
            name: '切换组件类型',
            title: '选择',
            desc: '',
            data: [
                {id:0, value: 1, desc: '单选'},
                {id:0, value: 2, desc: '多选'}
            ]
        },
        style: {
            layout: 'transverse',
        },
        selects: {
            title: '选项内容',
            value: 1,
            count: 3,
            data: [
                {id: 0, value: 1, desc: '选项1'},
                {id: 1, value: 2, desc: '选项2'},
                {id: 2, value: 3, desc: '选项3'},
            ]
        }
    },
    'Eselect': {
        name: '下拉选择',
        type: 'select',
        base: {
            value: 1,
            // name: '切换组件类型',
            title: '下拉',
            desc: '',
            /*data: [
                {id:0, value: 1, desc: '单选'},
                {id:0, value: 2, desc: '多选'}
            ]*/
        },
        style: {
            layout: 'transverse',
        },
        selects: {
            title: '切换组件类型',
            value: 1,
            count: 3,
            data: [
                {id: 0, value: 1, desc: '选项1'},
                {id: 1, value: 2, desc: '选项2'},
                {id: 2, value: 3, desc: '选项3'},
            ]
        }
    }
}
let elementPropertys = {};
elementTypes.forEach((type, index) => {
    elementPropertys[type] = Object.assign({}, elementBaseProperty, elementProperty[type]);
});

const mutations = {
    toggleClickedComponentRef(state, payload) {
        state.clickedComponentName = payload.name;
        state.clickedComponentRef = payload.ref;
    },
    toggleActiveComponentRef(state, payload) {
        state.activeComponentName = payload.name;
        state.activeComponentRef = payload.ref;
    },
    addElement(state, payload) {
        const type = elementTypes[elementTypes.indexOf(payload.componentName)];
        let element = state.elementList[payload.splice];

        if( !element) {
            element = JSON.parse(JSON.stringify(Object.assign({},{
                index: state.elementList.length,
                element: payload.componentName,
            }, elementPropertys[payload.componentName])));
        }
        if (payload.insert !== -1) {
            if (payload.splice !== undefined && payload.splice !== -1) {
                state.elementList.splice(payload.insert + 1, 0, element);
                // 删除原有元素，原有元素向上拖拽 splice +1
                if (payload.insert < payload.splice) {
                    state.elementList.splice(payload.splice + 1, 1);
                } else {
                    state.elementList.splice(payload.splice, 1);
                }
            } else {

                state.elementList.splice(payload.insert + 1, 0, element);
            }
        } else {
            state.elementList.push(element);
        }
    },
    deleteElement(state, payload) {
        state.elementList.splice(payload.ref, 1);
    },
    updateProperty(state, payload) {
        // let newElement = Object.assign({}, state.elementList[state.activeComponentRef]);

        if (payload.title != undefined) {
            state.elementList[state.activeComponentRef].base.title = payload.title;
        } else {
            state.elementList[state.activeComponentRef].base.desc = payload.desc;
        }
        // state.elementList[state.activeComponentRef] = newElement
    },
    updateSelect(state, payload) {
        state.elementList[state.activeComponentRef].base.value = payload.value;
    },
    updateIsTextArea(state, payload) {
        state.elementList[state.activeComponentRef].isTextArea = payload.value;
    },
    updateAttribute(state, payload) {
        if( payload.type == 'input') {
            state.elementList[state.activeComponentRef].base.value = payload.value;
        } else if (payload.type == 'selects') {
            state.elementList[state.activeComponentRef].selects.value = payload.value;
        }
    },
    selectItemOperate(state, payload) {
        const selects = state.elementList[state.activeComponentRef].selects,
            count  = selects.count + 1;
        if( payload.type == 'add') {
            selects.count += 1;
            selects.data.push({
                id: count,
                value: count,
                desc: '选项' + count
            });
        } else {
            selects.data.splice(payload.idx, 1);
        }
    }
};
export default mutations;
