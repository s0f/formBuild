<template>
    <MultiLineText :property="active.property.selects" :title="active.property.selects.title"   updateKey="selects"></MultiLineText>
</template>
<script>
    import MultiLineText from './MultiLineText';
    import selectField from './selectField';
    import scorePanel from './scorePanel';

    export default {
        name: 'tablePanel',
        data () {
            return {
            };
        },
        computed: {
        	active() {
                return this.$store.getters.activeComponent;
            }
        },
        components: {
            MultiLineText,
            selectField,
            scorePanel
        },
        methods: {
        }
    }
</script>
<style lang="css" scoped>
</style>