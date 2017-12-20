<template>
    <multiLineText :property="active.property.selects" title="选项内容" select></multiLineText>
</template>

<script>
    import multiLineText from './MultiLineText';

    export default {
        name: '',
        data () {
            return {}
        },
        components: {
            multiLineText
        },
        computed: {
        	active() {
                return this.$store.getters.activeComponent;
            }
        }
    }
</script>

<style scoped>

</style>
