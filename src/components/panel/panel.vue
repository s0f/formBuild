<template>
    <div class="stf-panel">
        <div class="stf-panel-title">{{ name }}</div>
        <div :class="['stf-panel-content', fold ? 'stf-panel-content' : '']">
            <!--<slot name="header"></slot>-->

            <div class="stf-field-input">
                <basePanel></basePanel>
            </div>
            <textPanel v-if="activeComponent.base.element === 'text'"></textPanel>
            <dateTimeDate v-if="activeComponent.base.element === 'dateTime_date'" :activeComponent="activeComponent"></dateTimeDate>
            <selectPanel v-if="activeComponent.base.type === 'select'"></selectPanel>
            <multiSelect v-if="activeComponent.base.type === 'multiSelect'"></multiSelect>
            <radioPanel v-if="activeComponent.base.type === 'radio'"></radioPanel>
            <NumberPanel v-if="activeComponent.base.element === 'number'"></NumberPanel>
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
            NumberPanel
        },
        props: ['name', 'fold'],
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            },
        }
    }
</script>
<style lang="scss">
    @import '../../style/var';

    .stf-field-title {
        font-size: 14px;
        color: #666;
        line-height: 30px;
    }

    .stf-field-item {
        margin-bottom: 6px;
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
