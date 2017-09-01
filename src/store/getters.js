/**
 * Created by 31602 on 2017/4/3.
 */
const getters = {
    activeComponent: state => {
        if(state.activeComponentRef != -1){
            return state.elementList[state.activeComponentRef];
        } else {
            return null;
        }
    },
    clickedRef: state => {
        let item = document.querySelector('[data-ref="'+state.clickedComponentRef+'"]');
        if (item) {
            return item.getAttribute('data-idx');
        } else {
            return -1;
        }

    }
};

export default getters;
