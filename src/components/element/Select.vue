<template>
    <SftElement type="select" :title="data.base.title" :desc="data.base.desc">
        <div class="sft-select">
            <span class="sft-tip">请选择</span>
            <span class="icon icon-arrow-bottom"></span>
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
        props: ['data'],
        components: {
            SftElement
        }
    }
</script>
<style lang="scss"></style>
