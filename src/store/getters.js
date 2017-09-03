/**
 * Created by 31602 on 2017/4/3.
 */
const getters = {
    activeComponent: state => {
        // let item = document.querySelector('[uuid="' + state.activeComponentUUID + '"]');
        if (state.activeComponentRef) {
            return state.elementList[state.activeComponentRef];
        } else {
            return null;
        }
    },
    clickedRef: state => {
        let item = document.querySelector('[uuid="' + state.activeComponentUUID + '"]');
        // debugger
        if (item) {
            console.log('data-idx', item.getAttribute('data-idx'))
            return item.getAttribute('data-idx');
        } else {
            return -1;
        }

    }
};

export default getters;
