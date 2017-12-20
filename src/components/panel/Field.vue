<template>
    <div :class="['sft-field-item', typeClass]">
        <span class="sft-field-title">{{ title }}</span>
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
        props: ['title', 'type'],
        computed: {
            typeClass() {
                if( this.type === 'inline' ) {
                    return 'sft-field-inline';
                } else if ( this.type === 'horizontal' ) {
                    return 'sft-field-hor';
                } else {
                    return '';
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
    .sft-field-item {
        padding: 0 6px 10px;
        background-color: #fff;
    }
    
    .sft-field-inline{
        display: inline-flex;
        justify-content: left;
        width: 48%;
        box-sizing: border-box;
        .sft-field-title{
            flex: 2;
        }
        .sft-field-content{
            position: relative;
            display: inline-block;
            flex: 3;
        }
    }

    .sft-field-hor {
        display: flex;

        .sft-field-title,
        .sft-field-content {
            flex: 1;
        }
    }
</style>
