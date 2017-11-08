<template>
    <div class="stf-field-item">
        <span class="stf-field-title">{{ title }}</span>
        <div class="sft-field-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {}
		},
        props: ['title']
	}
</script>

<style scoped>

</style>
