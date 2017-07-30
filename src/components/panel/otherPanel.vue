<template></template>
<script>
    import store from '../../store/'
    import textPanel from '../../components/panel/textPanel.vue'
    import selectPanel from '../../components/panel/selectPanel.vue'

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
            textPanel,
            selectPanel
        },
        render: function(createElement){
            return createElement('div', this.activeComponent);
        },
        props: ['active'],
        computed: {
            activeComponent: function () {
                return this.$store.state.elementPrefix + this.$store.state.activeComponentName
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
