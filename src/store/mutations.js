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
            title: '',
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
    toggleActiveComponentRef: function (state, payload) {
        state.activeComponentName = payload.name;
        // state.activeComponent = payload
        state.activeComponentRef = payload.ref;
    },
    addElement: function (state, payload) {
        const type = elementTypes[elementTypes.indexOf(payload.componentName)];
        let element;

        element = Object.assign({
            index: state.elementList.length,
            element: payload.componentName,
        }, elementPropertys[payload.componentName]);

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
    updateProperty(state, payload) {
        let newElement = Object.assign({}, state.elementList[state.activeComponentRef]);
        if( payload.title ) {
            newElement.base.title = payload.title;
        } else {
            newElement.base.desc = payload.desc;
        }
        state.elementList[state.activeComponentRef] = newElement
    }
};
export default mutations;
