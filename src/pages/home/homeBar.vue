<template>
    <section class="sft-left">
        <section class="sft-left_item" ref="baseBar">
            <Widget :baseWidgetTitle="baseWidgetTitle" :baseWidgets="baseWidgets" @widgetClickHandle="widgetClickHandle"></Widget>
            <Widget :baseWidgetTitle="picWidgetTitle" :baseWidgets="picWidgets" @widgetClickHandle="widgetClickHandle"></Widget>
            <Widget :baseWidgetTitle="auxiliaryTitle" :baseWidgets="auxiliarys" @widgetClickHandle="widgetClickHandle"></Widget>
        </section>
        <section class="sft-left_item" ref="concatBar">
            <Widget :baseWidgetTitle="contactsTitle" :baseWidgets="contacts" @widgetClickHandle="widgetClickHandle"></Widget>
            <Widget :baseWidgetTitle="imTitle" :baseWidgets="ims" @widgetClickHandle="widgetClickHandle"></Widget>
        </section>
    </section>
</template>
<script>
    import {mapState, mapGetters} from 'vuex';
    import Widget from '../../components/widget/baseWidget';

    function appendModuleName(moduleName, array){
        let res = {};
        array.forEach(function(moduleState){
            res[moduleState] = function(state){
            return state[moduleName][moduleState];
            };
        });
        return res;
    }
    export default {
        name: 'homeBar',
        data() {
            return {
            }
        },
        components: {
            Widget,
        },
        created(){
        },
        computed: {
            ...mapState(appendModuleName('editor',['baseWidgetTitle', 'picWidgetTitle', 'auxiliaryTitle', 'contactsTitle', 'imTitle', 'baseWidgets', 'picWidgets', 'auxiliarys', 'contacts', 'ims']))
        },
        methods: {
            widgetClickHandle(params) {
                this.$emit('widgetClickHandle', params);
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
