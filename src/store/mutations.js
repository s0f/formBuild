const elementTypes = ['Etext', 'Eradio', 'Eselect', 'EmultiSelect', 'EdateTime_date', 'Enumber'];
const elementBaseProperty = {
    uuid: 0,
    // 基础设置
    base: {
        required: false,
        // 填写设置
        limit: {
            repeat: true
        },
    },
    // 外观样式
    style: {}
};
/*
 *  设置种类汇总
 * */
const elementAttributes = {
    'changeTextLineCont': {
        name: '切换组件类型',
        data: [
            {id: 0, value: 1, desc: '单行文本'},
            {id: 0, value: 2, desc: '多行文本'}
        ]
    },
    'changeSelectType': {
        name: '切换组件类型',
        data: [
            {id: 0, value: 1, desc: '单选'},
            {id: 0, value: 2, desc: '多选'}
        ]
    },
    'changeTimeType': {
        name: '数据类型',
        data: [
            {id: 0, value: 1, desc: '日期+时间'},
            {id: 1, value: 2, desc: '日期'},
            {id: 2, value: 3, desc: '时间'}
        ]
    }
};

const elementProperty = {
    'Etext': {
        base: {
            title: '文本框',
            limit: false,
            name: '文本框', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'text', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: 1,
                data: [
                    {id: 0, value: 1, desc: '单行文本'},
                    {id: 1, value: 2, desc: '多行文本'}
                ]
            }
        }
    },
    'Enumber': {
        base: {
            title: '数字',
            limit: false,
            name: '数字', // 元素的名称
            desc: '',
            type: 'input', // 元素的类型
            element: 'number', // 元素的子类型
        },
        style: {
            layout: 'transverse', // transverse or vertical
            width: '20', // 10% - 100%
        },
        property: {
            lastFix: ''
        }
    },
    'Eradio': {
        base: {
            title: '选择',
            name: '选择',
            type: 'radio',
            element: '',
            desc: '',
        },
        style: {
            layout: 'transverse',
        },
        property: {
            changeType: {
                name: '切换组件类型',
                type: 'select',
                value: 1,
                data: [
                    {id: 0, value: 1, desc: '单选'},
                    {id: 1, value: 2, desc: '多选'}
                ]
            },
            selectContent: {
                name: '选项内容',
                type: 'multi-line-text',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1'},
                    {id: 1, value: 2, desc: '选项2'},
                    {id: 2, value: 3, desc: '选项3'},
                ]
            }
        }

    },

    'EdateTime_date': {
        base: {
            name: '日期',
            title: '日期时间',
            type: 'input',
            element: 'datetime_date',
            desc: '',
        },
        property: {
            checkValues: [],
            types: {
                'dateTime': ['YYYYMMdd', 'MMdd', 'dd'],
                'date': ['YYYYMMdd', 'YYYYMM', 'MMdd', 'YYYY', 'MM', 'dd']
            },
            dateTypeNumber: 'dateTime',
            customDefaultTime: '', // 默认时间
            isCustomDefaultTime: false,
            defaultItems: {
                'dateTime': [1, 2, 3],
                'date': [1, 5, 6, 7, 4],
                'time': [1, 2, 3]
            },
            changeTimeType: {
                name: '数据类型',
                data: [
                    {id: 0, value: 'dateTime', desc: '日期+时间'},
                    {id: 1, value: 'date', desc: '日期'},
                    {id: 2, value: 'time', desc: '时间'}
                ],
                value: 'dateTime'
            },
            changeDateFormat: {
                name: '接受的日期格式',
                value: 'YYYYMMdd',
                data: [{desc: '年-月-日', value: 'YYYYMMdd'}, {desc: '年-月', value: 'YYYYMM'}, {desc: '月-日', value: 'MMdd'},
                    {desc: '仅年', value: 'YYYY'}, {desc: '仅月', value: 'MM'}, {desc: '仅日', value: 'dd'},]
            },
            defaultShowTime: {
                name: '默认显示日期时间',
                value: 1,
                data: [{desc: '留空', value: 1}, {desc: '填表当前时间', value: 2}, {desc: '指定时间', value: 3},
                    {desc: '填表当天', value: 5}, {desc: '填表前一天', value: 6}, {desc: '填表后一天', value: 7}, {
                        desc: '指定日期',
                        value: 4
                    }]
            },
            accurateTimeData: {
                name: '时间精确到',
                value: 3,
                data: [{desc: '时', value: 1}, {desc: '分', value: 2}, {desc: '秒', value: 3}]
            },
        }
    },

    'Eselect': {
        base: {
            name: '下拉选择',
            title: '下拉',
            type: 'select',
            element: '',
            value: 1,
            desc: '',
        },
        style: {
            layout: 'transverse',
        },
        property: {
            selects: {
                title: '切换组件类型',
                type: 'multiLineText',
                value: 1,
                count: 3,
                data: [
                    {id: 0, value: 1, desc: '选项1'},
                    {id: 1, value: 2, desc: '选项2'},
                    {id: 2, value: 3, desc: '选项3'},
                ]
            }
        }
    },
    'EmultiSelect': {
        base: {
            name: '多级下拉',
            title: '多级下拉',
            type: 'multiSelect',
            element: '',
        },
        property: {
            tabs: {
                title: '',
                type: 'tab',
                value: '1',
                count: 2,
                data: [
                    {
                        desc: '一级',
                        value: '1'
                    },
                    {
                        desc: '二级',
                        value: '2'
                    }
                ]
            },
            oneLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            twoLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            threeLevel: {
                title: '默认提示文字',
                type: 'text',
                value: '请选择'
            },
            oneSelects: {
                title: '切换组件类型',
                type: 'multiLineText',
                value: '',
                count: 3,
                twoOne: '',
                threeOne: '',
                threeTwo: '',
                data: []
            }
        }
    }
}
let elementPropertys = {};
elementTypes.forEach((type, index) => {
    elementPropertys[type] = Object.assign({}, elementBaseProperty, elementProperty[type]);
});
const mutations = {
    toggleActiveComponent(state, payload) {
        payload.name && (state.activeComponentName = payload.name);
        payload.uuid && (state.activeComponentUUID = payload.uuid);
        payload.ref && (state.activeComponentRef = payload.ref);
    },
    addElement(state, payload) {
        const type = elementTypes[elementTypes.indexOf(payload.componentName)];
        let element = state.elementList[payload.splice];
        let elementProperty = payload.element ? state.elementPrefix + payload.element : payload.componentName;
        if (!element) {
            element = JSON.parse(JSON.stringify(Object.assign({},
                elementPropertys[elementProperty], {
                    index: state.elementList.length,
                    uuid: payload.uuid
                })));
            element.base.element = payload.element;
        }
        if (payload.insert !== -1) {
            if (payload.splice !== undefined && payload.splice !== -1) {
                state.elementList.splice(payload.insert + 1, 0, element);
                // 删除原有元素，原有元素向上拖拽 splice +1
                if (payload.insert < payload.splice) {
                    state.isUp = true;
                    state.elementList.splice(payload.splice + 1, 1);
                } else {
                    state.isUp = false;
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

        if (payload.title !== undefined) {
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
    updateBase(state, payload){
        state.elementList[state.activeComponentRef].base[payload.updateKey] = payload.value;
    },
    updateAttribute(state, payload) {
        let property = 'value';
        if (payload.property) {
            property = payload.property;
        }
        if(payload.easy){
            state.elementList[state.activeComponentRef].property[payload.type] = payload.value;
        } else {
            state.elementList[state.activeComponentRef].property[payload.type][property] = payload.value;
        }
    },
    updateForm(state, payload){
        state.formName = payload.formName;
        state.formDesc = payload.formDesc;
    },
    updateDeepAttribute(state, payload) {
        state.elementList[state.activeComponentRef].property[payload.type].data[payload.index].value = payload.value;
    },
    selectItemOperate(state, payload) {
        const selects = state.elementList[state.activeComponentRef].property[payload.updateKey || 'selects'],
            count = selects.count + 1;
        if (payload.type === 'add') {
            selects.count += 1;
            selects.data.push({
                id: count,
                value: count,
                desc: '选项' + count,
                data: []
            });
        } else {
            selects.data.splice(payload.idx, 1);
        }
    },
    selectArrayItemOperate(state, payload) {
        let selects = state.elementList[state.activeComponentRef].property[payload.updateKey],
            parentId = 0;
        function deep(arr){
            let result = null;
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i].value === payload.value ) {
                    result = arr[i];
                    parentId = arr[i].value * 10;
                    break;
                } else {
                    if( arr[i].data.length ){
                        for( let j = 0, len2=arr[i].data.length; j<len2; j++){
                            if(arr[i].data[j].value=== payload.value){
                                // TODO ID生成有问题，暂时不影响，待完善
                                parentId = arr[i].value*100 + (arr[i].data[j].value+j);
                                result = arr[i].data[j];
                                break;
                            }
                        }
                    }

                }
            }
         return result;
        }
        let count,
            item = deep(selects.data);


        if (payload.type === 'add') {
            count = item.data.length + 1;
            console.log('parentId:', parentId, count)
            item.data.push({
                id: parentId+count,
                value: parentId+count,
                desc: '选项' + count,
                data: []
            });
        } else {
            item.data.splice(payload.idx, 1);
        }
    },
    addItem(state, payload) {
        state.elementList[state.activeComponentRef].property.tabs.data.push(payload.value);
    },
    removeItem(state, payload){
        let item = state.elementList[state.activeComponentRef].property.tabs;
        item.data = payload.value;
        item.count = payload.value.length;
    },
    recovery(state, payload) {
        for (let key in payload.state) {
            state[key] = payload.state[key];
        }
        payload.callback();
    },
    updateStep(state, payload) {
        state.step = payload.step;
    },
    loading(state, payload) {
        state.isLoading = payload.loading;
    }
};
export default mutations;
