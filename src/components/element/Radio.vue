<template>
    <SftElement type="radio" :title="data.base.title" :desc="data.base.desc">
        <ul>
            <li v-for="item in data.property.selectContent.data" :id="item.id">
                <p>
                    <i :class="['icon',  data.property.changeType.value-1 ? 'icon-fangxingweixuanzhong':'icon-yuanxingweixuanzhong']"></i>
                    <span class="sft-radio-text">{{ item.desc }}</span>
                </p>
            </li>
        </ul>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';

    export default {
        name: "Eradio",
        data() {
            return {};
        },
        props: ['data'],
        components: {
            SftElement
        },
        computed: {
            isSingleSelect() {
                return this.data.base.value;
            }
        }
    }
</script>
<style lang="scss" scoped>
    li{
        margin: 8px 0;
    }
    .icon{
        margin-right: 4px;
        color: #999;
    }
    .sft-radio-text {
        color: #666;
    }
</style>
