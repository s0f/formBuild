<template>
    <div>
        <div v-for="(item, key) in activeComponent.property">
            <selectField v-if="item.type==='select'" :property="item" :updateKey="key"></selectField>
        </div>
    </div>
</template>

<script>
    import selectField from './selectField';

	export default {
		name: 'textPanel',
		data () {
			return {}
		},
        props: [''],
        components: {
            selectField
        },
        computed: {
            activeComponent() {
                return this.$store.getters.activeComponent;
            },
        }
	}
</script>

<style scoped>

</style>
