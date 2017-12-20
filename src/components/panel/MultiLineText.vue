<template>
    <Field :title="title">
        <div class="clearfix">
            <ul v-on:click="activeHandle" ref="select-wrap" class="sft-select-wrap">
                <li class="sft-select-item clearfix"
                    v-for="(item, index) in data" :data-index="index">
                    <i class="sft-select-drag"></i>
                    <i class="icon icon-dagou" v-if="select!=undefined"></i>
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
    import selectField from './selectField';

    export default {
        name: 'MultiLineText',
        data () {
            return {}
        },
        // seize 由父元素处理添加事件
        props: ['property', 'title', 'updateKey', 'btnName', 'seize', 'select'],
        components: {
            Field,
            selectField
        },
        computed: {
            data() {
                return this.property.data || this.property[this.updateKey].data;
            }
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
                // this.$store.commit('updateAttribute', params);
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

</style>
