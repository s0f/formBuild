<template>
    <div class="stf-panel">
        <div class="stf-panel-title">{{ name }}</div>
        <div :class="['stf-panel-content', fold ? 'stf-panel-content' : '']">
            <!--<slot name="header"></slot>-->
            <selectField v-if="activeComponent.isChange" type="base"
                         :title="activeComponent.base.name" :attr="activeComponent.base">
            </selectField>
            <div class="stf-field-input">
                <basePanel></basePanel>
            </div>
            <!--<slot name="content"></slot>-->
            <selectField v-if="activeComponent.selects" type="selects"
                         :title="activeComponent.selects.title" :attr="activeComponent.selects">
            </selectField>
        </div>
    </div>
</template>
<script>
    import basePanel from './basePanel';
    import globalPanel from './globalPanel';
    import selectField from './selectField';

    export default {
        name: "Panel",
        data() {
            return {};
        },
        components: {
            basePanel,
            selectField
        },
        props: ['name', 'title', 'fold'],
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            }
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
