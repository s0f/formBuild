<template>
    <div :class="['sft-element', 'sft-element-'+type]" :type="type">
        <div class="sft-border"></div>
        <div class="sft-element-body">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "Element",
    data() {
        return {
        };
    },
    props: {
        type: {
            type: String,
            default: 'text',
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.sft-element {
    position: relative;
    padding: 10px 0 6px;
    max-width: 800px;
    width: 100%;
    &:active {
        background-color: #f0f0f0;
    }
    &:hover,
    &.clicked{
        .sft-border {
            border-color: #ddd;
        }
    }
    &.clicked{
        background-color: #F8F4E8;
    }
}

.sft-element-body {
    padding-left: 2%;
}

.sft-element-title {
    height: 30px;
    line-height: 30px;

    text-align: left;
    font-size: 14px;
    color: #666;
}

.sft-element-content {
    text-align: left;
}

.sft-border {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    border: 1px dashed transparent;
}
</style>