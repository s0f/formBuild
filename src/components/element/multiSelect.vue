<template>
    <SftElement type="multiSelect">
        <div class="sft-element-title">{{ data.base.title }}</div>
        <div class="sft-element-content">
            <p class="sft-element-desc">{{ data.base.desc }}</p>
            <div>
                <div class="sft-select">
                    <span class="sft-tip">请选择</span>
                    <span class="icon icon-arrow-bottom"></span>
                </div>
                <div class="sft-select">
                    <span class="sft-tip">请选择</span>
                    <span class="icon icon-arrow-bottom"></span>
                </div>
            </div>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';

    export default {
        name: "EmutilSelect",
        data() {
            return {};
        },
        props: ['data'],
        components: {
            SftElement
        },
    }
</script>
<style lang="scss" scoped>

    .sft-select {
        display: inline-block;
        width: 30%;
        height: 30px;
        line-height: 30px;

        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;

        .sft-tip {
            margin-left: 10px;
            color: #999;
        }
        .icon-arrow-bottom {
            float: right;
            margin-right: 10px;
        }
    }
</style>
