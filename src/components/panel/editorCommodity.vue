<template>
    <div class="edit-commodity">
        <Field title="商品图片">
            <div class="pic-editor">
                <div class="pic-item">
                    <span class="upload-img-btn"></span>
                    <span>上传图片</span>
                </div>
                <div class="pic-item">
                    <span class="import-img-btn"></span>
                    <span>引用图片</span>
                </div>
            </div>
        </Field>
        <Field title="商品名称">
            <input class="sft-field-input sft-select-input" :updatekey="keys[0]" :value="data.name" @input="commodityName"/>
        </Field>
        <Field title="商品描述">
            <input class="sft-field-input sft-select-input" :updatekey="keys[1]" :value="data.desc" @input="commodityName"/>
        </Field>
        <Field title="商品单价">
            <input class="sft-field-input sft-select-input" :updatekey="keys[2]" :value="data.money" @input="commodityName"/>
        </Field>
        <div class="text-center"><el-button type="primary" size="mini" class="margin-top" @click.stop="editorOk">保存</el-button></div>
    </div>
</template>
<script>
    import Field from './Field';

    export default {
        name: 'editorCommodity',
        data () {
            return {
                keys: ['name', 'desc', 'money']
            };
        },
        props: ['data', 'index'],
        components: {
            Field
        },
        methods: {
            editorOk() {
                this.$store.commit('editCommodity', {
                    index: this.index,
                    value: false,
                    updateKey: 'editor'
                });
            },
            commodityName(event) {
                let updateKey = event.target.getAttribute('updatekey'),
                    value = event.target.value,
                    isNumber = /^\d+\.?\d$/;
                switch(updateKey) {
                    case this.keys[2]:
                        if( isNaN(value) ) {
                            event.target.classList.add('error');
                            return false;
                        } else {
                            event.target.classList.remove('error');
                        }
                        break;
                }

                this.$store.commit('editCommodity', {
                    index: this.index,
                    value: value,
                    updateKey: updateKey
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .edit-commodity{
        z-index: 1;
        position: relative;
        padding: 4px;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 3px #ddd;
        box-sizing: border-box;
    }
    .pic-editor {
        position: relative;
        width: 100%;
        height: 68px;
        padding: 4px;
        background-color: #fff;
        border: 1px solid #E6E9EF;
        box-sizing: border-box;
    }

    .pic-item {
        float: left;
        width: 50%;
        height: 100%;
        margin-right: -1px;
        padding: 5px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 48px;

        &:hover {
            border-color: #999;
        }
    }

    .upload-img-btn,
    .import-img-btn {
        display: inline-block;
        width: 32px;
        height: 32px;
        background: url(../../assets/sprite.png) -360px -120px no-repeat;
        vertical-align: middle;
    }

    .import-img-btn {
        background-position: -392px -120px;
    }

    .sft-field-input.error {
        border-color: red;
    }
</style>