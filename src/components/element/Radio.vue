<template>
    <SftElement type="radio">
        <div class="sft-element-title">{{ $store.state.elementList[idx].base.title }}</div>
        <div class="sft-element-content">
            <p class="sft-element-desc">{{ $store.state.elementList[idx].base.desc }}</p>
            <ul>
                <li v-for="item in $store.state.elementList[idx].selects.data" :id="item.id">
                    <p>
                        <i :class="['icon',  isSingleSelect-1 ? 'icon-fangxingweixuanzhong':'icon-yuanxingweixuanzhong']"></i>
                        <span class="sft-radio-text">{{ item.desc }}</span>
                    </p>
                </li>
            </ul>
        </div>
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
        props: ['idx'],
        components: {
            SftElement
        },
        computed: {
            isSingleSelect() {
                return this.$store.state.elementList[this.idx].base.value;
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
