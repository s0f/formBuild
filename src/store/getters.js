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
    }
};

export default getters;
