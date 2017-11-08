<template>
    <SftElement type="input">
        <div class="sft-element-title">{{ data.base.title }}</div>
        <div class="sft-element-content">
            <p class="sft-element-desc">{{ data.base.desc }}</p>
            <div class="sft-element-in">
                <inputIcon :type="data.base.element" class="sft-input-prefix"></inputIcon>
                <div v-if="data.base.element === 'dateTime_date'">
                    <input type="text" disabled class="sft-input" title=""/>
                </div>
                <div v-if="data.base.element === 'text'">
                    <div class="sft-textarea" v-if="data.property.changeType.value -1 === 1"></div>
                    <input type="text" disabled class="sft-input" title="" v-else/>
                </div>
            </div>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';
    import inputIcon from './inputIcon.vue';

    export default {
        name: "EInput",
        store,
        data() {
            return {};
        },
        props: ['data'],
        components: {
            SftElement,
            inputIcon
        }
    }
</script>
<style lang="scss">
    @import '../../style/var';

    .sft-element-in{
        position: relative;
    }
    .sft-input-prefix{
        position: absolute;
        left: 10px;
        top: 10px;

        .icon{
            font-size: $f-size-big;
            color: #4169e1;
        }
    }
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
