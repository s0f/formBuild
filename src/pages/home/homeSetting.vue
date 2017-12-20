<template>
    <section class="sft-setting">
        <div class="sft-setting-wrap">
            <globalPanel ref="globalSetting"></globalPanel>
            <div class="sft-setting-other" ref="other" v-if="activeComponent">
                <panel :name="activeComponent.base.name">
                </panel>
            </div>
        </div>
    </section>
</template>
<script>
    import store from '../../store/'
    import $ from '../../common/query'
    import globalPanel from '../../components/panel/globalPanel.vue'

    export default {
        name: "homeSetting",
        store,
        data() {
            return {
                panelList: [
                    {
                        name: '文本框'
                    }
                ]
            };
        },
        components: {
            globalPanel
        },
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            }
        },
        created() {
        },
        
    }
</script>
<style lang="scss">
    .sft-setting {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10px;
        width: 320px;
    }

    .sft-setting-global,
    .sft-setting-other {
        position: relative;
        margin-bottom: 10px;
        overflow: hidden;
        text-align: left;
    }

    .sft-setting-other {
        position: absolute;
        width: 100%;
        bottom: 0;
        top: 100px;
    }

    .sft-field-checkbox-wrap {
        padding: 10px 0;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
    }

    .icon-checkbox {
        font-size: 20px;
        color: #999;
        vertical-align: middle;
        cursor: pointer;
    }

</style>
