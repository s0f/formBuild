<template>
    <div>
        <slot></slot>    
        <div :class="['tool-tip', 'tool-tip_'+type]" v-if="show">
            <div class="tool-tip_content">{{ content }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'toolTip',
    data () {
        return {
        };
    },
    props: {
        show: Boolean,
        content: String,
        type: {
            default: 'text',
            type: String
        }
    }
}
</script>
<style lang="scss" scoped>
    .tool-tip{
        position: absolute;
        max-width: 250px;
        width: 125px;
        height: 25px;
        font-size: 14px;
        border-radius: 5px;
        line-height: 25px;
    }
    .tool-tip_content{
        text-align: center;
    }
    .tool-tip_text{
        background-color: #fff;
        color: #666;
    }
    .tool-tip_error{
        background-color: #C53B37;
        color: #fff;
    }
</style>