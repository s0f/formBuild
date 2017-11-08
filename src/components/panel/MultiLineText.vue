<template>
    <Field :title="title">
        <div class="clearfix">
            <ul v-on:click="activeHandle" ref="select-wrap" class="sft-select-wrap">
                <li class="sft-select-item clearfix"
                    v-for="(item, index) in property.data" :data-index="index">
                    <i class="icon icon-dagou"></i>
                    <div class="sft-select-item-input">
                        <input v-model="item.desc" class="sft-field-input sft-select-input"
                               @input="updateAttribute"/>
                        <div class="icon sft-delete" @click="deleteHandle"></div>
                        <div class="sft-select-item-border"></div>
                    </div>
                </li>
            </ul>
            <div class="text-center">
                <el-button type="primary" @click="addSelectItemHandle" size="mini" class="margin-top">{{btnName||'添加'}}</el-button>
            </div>
        </div>
    </Field>
</template>

<script>
    import Field from './Field';

    export default {
        name: 'MultiLineText',
        data () {
            return {}
        },
        // seize 由父元素处理添加事件
        props: ['property', 'title', 'updateKey', 'btnName', 'seize'],
        components: {
            Field
        },
        methods: {
            deleteHandle(event) {
                let parent = event.target.parentElement.parentElement,
                    params = {type: 'reduce', idx: parent.getAttribute('data-index'), updateKey: this.updateKey};
                if(this.seize !== undefined){
                    this.$emit('selectItemOperate', params);
                } else {
                    this.$store.commit('selectItemOperate', params);
                }
            },
            addSelectItemHandle() {
            	if(this.seize !== undefined){
                    this.$emit('selectItemOperate', {type: 'add', updateKey: this.updateKey});
                } else {
                    this.$store.commit('selectItemOperate', {type: 'add', updateKey: this.updateKey});
                }
            },
            updateAttribute(value) {
                const params = {
                    type: 'selects',
                    value: value
                };
                this.$emit('change', params);
                this.$store.commit('updateAttribute', params);
            },
            activeHandle(event) {
                let target = event.target.parentElement.parentElement;
                let lis = this.$refs['select-wrap'].querySelectorAll('li');
                lis.forEach((value, index, listObj) => {
                    value.classList.remove('active');
                });
                if (target.nodeName === 'LI') {
                    target.classList.add('active');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sft-btn {
        padding: 2px 14px;
        height: 24px;
        line-height: 24px;
        border: 0;
        cursor: pointer;
        border-radius: 4px;
        outline: 0;
    }

    .sft-btn-primary {
        background: #30b900;
        color: #ffffff;

        &:hover {
            background: #299e00;
            box-shadow: 0 0 3px 0 #dedede;
        }
    }

    .sft-select-item {
        position: relative;
        margin-bottom: 4px;

        .icon-dagou {
            float: left;
            margin-right: 6px;
            color: #ddd;
            cursor: pointer;
        }

        .sft-delete {
            right: -16px;
        }

        &:hover {
            .sft-delete {
                display: block;
            }
        }
        &:hover,
        &:hover input {
            background-color: #f1f1f1;
        }

        &.active {
            input {
                border-bottom-color: #999999;
            }
            .sft-select-item-border {
                display: block;
            }
        }
        .sft-select-item-input {
            position: relative;
            margin-left: 22px;
            margin-right: 14px;
        }
        .sft-select-item-border {
            display: none;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            height: 2px;
            border-left: 1px solid #999999;
            border-right: 1px solid #999999;
        }

        .sft-field-input {
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>
