
const mutations = {
    toggleActiveComponent(state, payload) {
        payload.name && (state.activeComponentName = payload.name);
        payload.uuid && (state.activeComponentUUID = payload.uuid);
        payload.ref && (state.activeComponentRef = payload.ref);
    },
    addElement(state, payload) {
        const type = state.editor[payload.componentName];
        let element = state.elementList[payload.splice];
        let elementProperty = payload.element ? state.elementPrefix + payload.element : payload.componentName;
        if (!element) {
            element = JSON.parse(JSON.stringify(Object.assign({},
                state.editor[elementProperty], {
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
                data: payload.data || []
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
    },
    updateTableColumn(state, payload) {
        state.elementList[state.activeComponentRef].property[payload.updateKey].data.forEach(item => {
            item.data.push(payload.data);
        });
    },
    getAllCountry(state, payload) {
        state.country = payload.data;
    },
    editCommodity(state, payload) {
        let commodityList = state.elementList[state.activeComponentRef].property.list;
        commodityList[payload.index][payload.updateKey] = payload.value;
    },
    addCommodity(state, payload) {
        state.elementList[state.activeComponentRef].property.list.push(
            {
                name: '商品名',
                desc: '',
                money: '0.00',
                total: 0,
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=843493999,2467842738&fm=173&s=3685F90450F2579E9C8C84D6030000B9&w=218&h=146&img.JPG',
                editor: false
            });
    }
};
export default mutations;
