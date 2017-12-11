<template>
    <div :class="['stf-field-item', type ? 'sft-field-inline' : '']">
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
        props: ['title', 'type']
	}
</script>

<style lang="scss" scoped>
    .sft-field-inline{
        display: inline-flex;
        justify-content: left;
        width: 48%;
        box-sizing: border-box;
        .stf-field-title{
            flex: 2;
        }
        .sft-field-content{
            position: relative;
            display: inline-block;
            flex: 3;
        }
    }
</style>
