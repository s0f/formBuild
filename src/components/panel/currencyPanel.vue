<template>
    <selectField title="输入框右侧文字（单位）" :property="property.changeType" updateKey="changeType" easy></selectField>
</template>
<script>
    import selectField from "./selectField.vue";
    export default {
        name: 'currency',
        data() {
            return {};
        },
        props: ['title'],
        components: {
            selectField
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
    };

</script>
<style lang="scss" scoped>


</style>
