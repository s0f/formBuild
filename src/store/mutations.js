const mutations = {
    toggleActiveComponentRef: function (state, payload) {
        state.activeComponentRef = payload.ref;
    },
    addElement: function (state, payload) {
        const element = Object.assign({
            index: state.elementList.length,
            element: payload.componentName,
        }, state[payload.componentName]);
        if (payload.insert !== -1) {
            if (payload.splice !== undefined  && payload.splice !== -1){
                state.elementList.splice(payload.insert+1, 0, element);
                state.elementList.splice(payload.splice, 1);
            } else {

                state.elementList.splice(payload.insert+1, 0, element);
            }
        } else {
            state.elementList.push(element);
        }
    },
};
export default mutations;
