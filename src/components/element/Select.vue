<template>
    <SftElement type="select">
        <div class="sft-element-title">{{ $store.state.elementList[idx].base.title }}</div>
        <div class="sft-element-content">
            <p class="sft-element-desc">{{ $store.state.elementList[idx].base.desc }}</p>
            <div class="sft-select">
                <span class="sft-tip">请选择</span>
                <span class="icon icon-arrow-bottom"></span>
            </div>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';

    export default {
        name: "ESelect",
        store,
        data() {
            return {};
        },
        props: ['idx'],
        components: {
            SftElement
        }
    }
</script>
<style lang="scss">
    .sft-select {
        width: 80%;
        height: 30px;
        line-height: 30px;

        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;

        .sft-tip{
            margin-left: 10px;
        }
        .icon-arrow-bottom{
            float: right;
            margin-right: 10px;
        }
    }
</style>
