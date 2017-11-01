<template>
    <section class="stf-setting">
        <div class="stf-setting-wrap">
            <globalPanel></globalPanel>
            <div class="stf-setting-other">
                <!--<keep-alive>
                    <componten :is="activeComponent"></componten>
                </keep-alive>-->

                <panel v-if="activeComponent" :name="activeComponent.name">
                </panel>
            </div>
        </div>
    </section>
</template>
<script>
    import store from '../../store/'
    import globalPanel from '../../components/panel/globalPanel.vue'
    import Einput from '../../components/panel/textPanel.vue'
    import Eradio from '../../components/panel/radioPanel.vue'
    import Eselect from '../../components/panel/selectPanel.vue'

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
            Eradio,
            Eselect
        },
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            }
        }
    }
</script>
<style lang="scss">
    .stf-setting {
        position: absolute;
        right: 10px;

        width: 300px;
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
        cursor: pointer;
    }

    .icon-checkbox {
        font-size: 20px;
        color: #999;
        vertical-align: middle;
        cursor: pointer;
    }

</style>
