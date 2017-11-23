<template>
    <TextField :title="active.base.title"></TextField>
</template>

<script>
    import TextField from './TextField';

    export default {
        name: 'NumberPanel',
        data() {
            return {}
        },
        components: {
            TextField
        },
        computed: {
            property() {
				return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            }
        },
        methods: {
        }
    }

</script>

<style scoped>


</style>
