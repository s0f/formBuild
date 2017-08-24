<template>
    <div class="stf-panel">
        <div class="stf-panel-title">{{ title }}</div>
        <div :class="['stf-panel-content', fold ? 'stf-panel-content' : '']">
            <slot name="header"></slot>
            <div class="stf-field-input">
                <basePanel></basePanel>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    import basePanel from './basePanel';

    export default {
        name: "Panel",
        data() {
            return {};
        },
        components: {
            basePanel
        },
        props: ['title', 'fold']
    }
</script>
<style lang="scss">
    @import '../../style/var';

    .stf-panel-title {
        padding-left: 10px;
        height: 35px;
        line-height: 35px;

        background-color: $primary;
        cursor: pointer;

        color: $active;
    }

    .stf-panel-content {
        padding: 5px;
    }

    .stf-field-title {
        font-size: 14px;
        color: #666;
        line-height: 30px;
    }

    .stf-field-item {
        margin-bottom: 6px;
    }

    .sft-field-input{
        padding-left: 6px;
        height: 24px;
        line-height: 24px;
        color: #666;
        border: 1px solid #dfdfdf;
        font-size: 14px;
    }

    .sft-field-select{
        border: 1px solid #ddd;
        background: #fdfdfd;
        height: 26px;
        line-height: 26px;
        color: #666;
        width: 180px;
        padding: 1px 4px;
    }

</style>
