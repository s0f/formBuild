<template>
    <section class="stf-setting">
        <div class="stf-setting-wrap">
            <globalPanel></globalPanel>
            <div class="stf-setting-other">
                <keep-alive>
                    <componten :is="activeComponent"></componten>
                </keep-alive>
            </div>
        </div>
    </section>
</template>
<script>
    import store from '../../store/'
    import globalPanel from '../../components/panel/globalPanel.vue'
    import Einput from '../../components/panel/textPanel.vue'
    import Eradio from '../../components/panel/selectPanel.vue'

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
            globalPanel,
            Einput,
            Eradio
        },
        computed: {
            activeData() {
                if (this.$store.state.activeComponentRef && this.$store.state.elementList[this.$store.state.activeComponentRef]) {
                    return this.$store.state.elementList[this.$store.state.activeComponentRef]
                } else {
                    return {};
                }
            },
            activeComponent() {
                if (this.$store.state.activeComponentName) {
                    return this.$store.state.elementPrefix + this.$store.state.activeComponentName
                }
            }
        }
    }
</script>
<style lang="scss">
    .stf-setting {
        position: absolute;
        right: 0;

        width: 300px;
    }

    .stf-setting-global {
        border: 1px solid #ddd;
    }

    .stf-setting-global,
    .stf-setting-other {
        margin-bottom: 10px;

        background-color: #fff;

        overflow: hidden;
        text-align: left;
    }

    .stf-field-checkbox-wrap {
        padding: 5px 10px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #666;
    }

    .stf-field-title {
        font-size: 14px;
        color: #666;
    }

    .icon-checkbox {
        font-size: 20px;
        color: #999;
        vertical-align: middle;
        cursor: pointer;
    }

    .stf-panel {
        margin-bottom: 20px;
        border: 1px solid #ddd;
    }
</style>
