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
</style>
