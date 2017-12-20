<template>
    <span class="">
        <i class="icon" v-html="icon"></i>
    </span>
</template>

<script>
	export default {
		name: 'inputIcon',
		data () {
			return {}
		},
        props: {
			icon: String
        }
	}
</script>

<style scoped>

</style>
