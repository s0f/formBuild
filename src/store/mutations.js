const elementTypes = ['Einput', 'Eradio'];
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
        base: {
            value: 0,
            title: '文本框',
            desc: ''
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        }
    },
    'Eradio': {
        style: {
            layout: 'transverse',
        }
    }
}
let elementPropertys = {};
elementTypes.forEach((type, index) => {
    elementPropertys[type] = Object.assign(elementBaseProperty, elementProperty[type]);
});


const mutations = {
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
        /*element = JSON.parse(JSON.stringify(Object.assign({},{
            index: state.elementList.length,
            element: payload.componentName,
        }, elementPropertys[payload.componentName])));

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
        }*/
    },
    deleteElement(state, payload) {
        state.elementList.splice(payload.ref, 1);
    },
    updateProperty(state, payload) {
        // let newElement = Object.assign({}, state.elementList[state.activeComponentRef]);
        if (payload.title) {
            state.elementList[state.activeComponentRef].base.title = payload.title;
        } else {
            state.elementList[state.activeComponentRef].base.desc = payload.desc;
        }
        console.log(state.elementList[state.activeComponentRef])
        // state.elementList[state.activeComponentRef] = newElement
    }
};
export default mutations;
