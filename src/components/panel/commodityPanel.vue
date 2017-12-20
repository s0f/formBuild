<template>
    <Field title="选项内容">
        <ul v-on:click="activeHandle" ref="select-wrap" class="sft-select-wrap">
            <li class="sft-select-item clearfix"
                v-for="(item, index) in property.list" :data-index="index">
                <i class="sft-select-drag"></i>
                <div class="sft-select-item-input"  v-if="!item.editor">
                    <div class="commodity-wrap">
                        <div class="commodity-img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="commodity-info">
                            <h4 class="commodity-name">{{ item.name }}</h4>
                            <p class="commodity-desc">{{ item.desc }}</p>
                            <p class="commodity-money">{{ item.money }}</p>
                        </div>
                    </div>
                    <div class="icon sft-delete" @click="deleteHandle"></div>
                    <div class="sft-select-item-border"></div>
                </div>
                <EditorCommodity :data="item" :index="index" v-if="item.editor"></EditorCommodity>
            </li>
        </ul>
        <div class="text-center">
            <el-button type="primary" @click="addSelectItemHandle" size="mini" class="margin-top">添加商品</el-button>
        </div>
    </Field>
</template>
<script>
    import $ from '../../common/query';
    import Field from './Field';
    import EditorCommodity from './editorCommodity';

    export default {
        name: 'currency',
        data() {
            return {};
        },
        components: {
            Field,
            EditorCommodity,
        },
        computed: {
            property() {
                return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            }
        },
        methods: {
            activeHandle(event) {
                let target = $.parents(event.target ,'li');
                let lis = this.$refs['select-wrap'].querySelectorAll('li');
                lis.forEach((value, index, listObj) => {
                    value.classList.remove('active');
                });
                console.log(target)
                if (target.nodeName === 'LI') {
                    this.$store.commit('editCommodity', {
                        index: $.index(lis, target),
                        value: true,
                        updateKey: 'editor'
                    });
                }
            },
            deleteHandle() {

            },
            addSelectItemHandle() {
                this.$store.commit('addCommodity');
            }
        }
    };

</script>
<style lang="scss" scoped>

    .commodity-wrap {
        padding: 10px;
        border: 1px solid #efefef;
        cursor: pointer;
    }

    .commodity-info {
        position: relative;
        padding-left: 100px;
        min-height: 60px;
    }

    .commodity-img {
        float: left;
        margin-right: 10px;
        width: 90px;

        img{
            width: 100%;
        }
    }

    .commodity-name {
        line-height: 18px;
        color: #000;
    }

    .commodity-desc {
        padding-bottom: 20px;
        line-height: 18px;
        font-size: 1.2px;
        color: #848484;
    }

    .commodity-money {
        position: absolute;
        left: 100px;
        bottom: 0;
        line-height: 20px;
        color: #2D8FD9;
        font-size: 14px;
    }

    
</style>
