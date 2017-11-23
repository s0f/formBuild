<template>
    <span class="">
        <i class="icon" v-if="type === 'dateTime_date'">&#xe604;</i>
    </span>
</template>

<script>
	export default {
		name: 'inputIcon',
		data () {
			return {}
		},
        props: {
			type: String
        }
	}
</script>

<style scoped>

</style>
