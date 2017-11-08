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
            <MultiLineText v-if="activeComponent.base.type === 'radio'" updateKey="selectContent"
                           :property="activeComponent.property.selectContent" :title="activeComponent.property.selectContent.name"></MultiLineText>
        <!--    <selectField v-if="activeComponent.isChange" type="base"
                         :title="activeComponent.base.name" :attr="activeComponent.base">
            </selectField>
            <div class="stf-field-input">
                <basePanel></basePanel>
            </div>
            &lt;!&ndash;<slot name="content"></slot>&ndash;&gt;
            <selectField v-if="activeComponent.selects" type="selects"
                         :title="activeComponent.selects.title" :attr="activeComponent.selects">
            </selectField>

            &lt;!&ndash; 日期时间 &ndash;&gt;
            <dateTimeDate v-if="activeComponent.element === 'dateTime_date'" :activeComponent="activeComponent"></dateTimeDate>-->
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
    import MultiLineText from './MultiLineText';

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
            MultiLineText
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
