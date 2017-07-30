<template>
    <SftElement type="radio">
        <div class="sft-element-title">选择</div>
        <div class="sft-element-content">
            <ul>
                <li>
                    <p><i class="icon icon-yuanxingweixuanzhong"></i><span class="sft-radio-text">选项一</span></p>
                </li>
                <li>
                    <p><i class="icon icon-yuanxingweixuanzhong"></i><span class="sft-radio-text">选项二</span></p>
                </li>
                <li>
                    <p><i class="icon icon-yuanxingweixuanzhong"></i><span class="sft-radio-text">选项三</span></p>
                </li>
            </ul>
        </div>
    </SftElement>
</template>
<script>
    import SftElement from './SftElement.vue';

    export default {
        name: "Eradio",
        data() {
            return {};
        },
        components: {
            SftElement
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
