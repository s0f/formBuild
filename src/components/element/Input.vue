<template>
    <SftElement type="input">
        <div class="sft-element-title">{{ $store.state.elementList[idx].base.title }}</div>
        <div class="sft-element-content">
            <p class="sft-element-desc">{{ $store.state.elementList[idx].base.desc }}</p>
            <div class="sft-textarea" v-if="$store.state.elementList[idx].base.value -1 == 1"></div>
            <input type="text" disabled class="sft-input" title="" v-else/>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';

    export default {
        name: "EInput",
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
    .sft-input {
        width: 80%;
        height: 30px;

        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
    .sft-textarea{
        width: 80%;
        height: 90px;
        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
</style>
