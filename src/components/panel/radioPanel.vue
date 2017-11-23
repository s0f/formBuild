<template>
    <div>
        <selectField :property="property.changeType" updateKey="changeType"></selectField>
        <MultiLineText updateKey="selectContent"
                       :property="property.selectContent" :title="property.selectContent.name"></MultiLineText>
    </div>
</template>
<script>
    import selectField from './selectField';
    import MultiLineText from './MultiLineText';

	export default {
		name: 'radioPanel',
		data () {
			return {}
		},
        computed: {
            property() {
				return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            }
        },
        components: {
            MultiLineText,
            selectField
        }
	}
</script>

<style scoped>

</style>
