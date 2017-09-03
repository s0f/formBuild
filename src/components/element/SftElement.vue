<template>
    <div :class="['sft-element', 'sft-element-'+type]">
        <div class="sft-border"></div>
        <div class="sft-element-body">
            <slot></slot>
        </div>
        <div class="icon sft-delete" @click="deleteHandle"></div>
    </div>
</template>
<script>
import store from '../../store/';

export default {
    name: "Element",
    store,
    data() {
        return {
        };
    },
    props: {
        type: {
            type: String,
            default: 'text',
            required: true
        }
    },
    methods: {
        deleteHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            let target = event.target,
                parent = target.parentElement;
            this.$store.commit('deleteElement', {type: this.type, ref: Number.parseInt(parent.getAttribute('data-idx'))});
        }
    }
}
</script>
<style lang="scss">
.sft-element {
    position: relative;
    max-width: 800px;
    width: 100%;
    &:active {
        background-color: #f0f0f0;
    }
    &:hover{
        .sft-delete{
            display: block;
        }
    }
    &:hover,
    &.clicked{
        .sft-border {
            border-color: #ddd;
        }
    }
    &.clicked{
        background-color: #F8F4E8;
    }
}

.sft-element-body {
    padding: 10px 0 10px 2%;
}

.sft-element-title {
    height: 30px;
    line-height: 30px;

    text-align: left;
    font-size: 16px;
    color: #ddd;
}

.sft-element-desc{
    line-height: 30px;
    color: #666666;
    font-size: 14px;
}

.sft-element-content {
    text-align: left;
}

.sft-border {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    border: 1px dashed transparent;
}
    .sft-delete{
        display: none;
        position: absolute;
        right: -9px;
        top: -9px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        background-color: #f13131;
        box-shadow: 0 1px 2px rgba(0,0,0,0.4);
        cursor: pointer;

        &:hover{
            background-color: #ff4242;
        }
        &::before{
            content: '\e62e';
            font-size: 14px;
            color: #ffffff;
        }
    }

</style>
