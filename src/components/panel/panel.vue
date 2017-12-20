<template>
    <div class="sft-panel">
        <div class="sft-panel-title">{{ name }}</div>
        <div :class="['sft-panel-content', 'sft-panel-wrap', fold ? 'sft-panel-content' : '']" ref="panelContent">
            <!--<slot name="header"></slot>-->
            <basePanel></basePanel>
            <textPanel v-if="activeComponent.base.element === 'text'"></textPanel>
            <dateTimeDate v-if="activeComponent.base.element === 'dateTime_date'" :activeComponent="activeComponent"></dateTimeDate>
            <selectPanel v-if="activeComponent.base.type === 'select'"></selectPanel>
            <multiSelect v-if="activeComponent.base.type === 'multiSelect'"></multiSelect>
            <radioPanel v-if="activeComponent.base.type === 'radio'"></radioPanel>
            <NumberPanel v-if="activeComponent.base.element === 'number'"></NumberPanel>
            <scorePanel v-if="activeComponent.base.element === 'score'"></scorePanel>
            <tablePanel v-if="activeComponent.base.type === 'table'"></tablePanel>
            <sortPanel v-if="activeComponent.base.type === 'sort'"></sortPanel>
            <currencyPanel v-if="activeComponent.base.element === 'currency'"></currencyPanel>
            <commodityPanel v-if="activeComponent.base.type === 'commodity'"></commodityPanel>
            <cityPanel v-if="activeComponent.base.type === 'city'"></cityPanel>
        </div>
    </div>
</template>
<script>
    import basePanel from './basePanel';
    import textPanel from './textPanel';
    import selectField from './selectField';
    import checkboxField from './checkboxField';
    import dateTimeDate from './dateTimeDate';
    import selectPanel from './selectPanel';
    import multiSelect from './multiSelect';
    import radioPanel from './radioPanel';
    import NumberPanel from './NumberPanel';
    import scorePanel from './scorePanel';
    import tablePanel from './tablePanel';
    import sortPanel from './sortPanel';
    import currencyPanel from './currencyPanel';
    import commodityPanel from './commodityPanel';
    import cityPanel from './cityPanel';

    import PerfectScrollbar  from 'perfect-scrollbar'
    import 'perfect-scrollbar/css/perfect-scrollbar.css'
    
    export default {
        name: "Panel",
        data() {
            return {};
        },
        components: {
            basePanel,
            textPanel,
            selectField,
            checkboxField,
            dateTimeDate,
            selectPanel,
            multiSelect,
            radioPanel,
            NumberPanel,
            scorePanel,
            tablePanel,
            sortPanel,
            currencyPanel,
            commodityPanel,
            cityPanel,
        },
        props: ['name', 'fold'],
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            },
        },
        created() {
        },
        mounted() {
            let scrollbar = null;
            this.$nextTick(function () {
                scrollbar = new PerfectScrollbar(this.$refs.panelContent);
            });
            // let globalSettingHeight = this.$refs.globalSetting.$el.offsetHeight;
            // this.$refs.panelContent.style.top = globalSettingHeight + 20 + 'px';
        },
        methods: {
        }
    }
</script>
<style lang="scss">
    @import '../../style/var';

    .sft-field-title {
        font-size: 14px;
        color: #666;
        line-height: 30px;
    }

    .sft-panel-wrap {
        position: absolute;
        top: 35px;
        bottom: 0;
        width: 100%;
    }

    .sft-field-input {
        padding-left: 6px;
        height: 24px;
        line-height: 24px;
        color: #666;
        border: 0;
        border-bottom: 1px solid $border-4;
        font-size: 14px;
        outline: 0;

        &.active{
            border-bottom-color: #999;
        }
    }

    .sft-field-select {
        border: 1px solid $border-4;
        background: #fdfdfd;
        height: 26px;
        line-height: 26px;
        color: #666;
        width: 180px;
        padding: 1px 4px;
    }

</style>
