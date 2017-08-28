<template>
    <div class="stf-field-item" slot="header">
        <span class="stf-field-title">{{ title }}</span>
        <div class="sft-field-content">
            <select v-if="type == 'base'" :type="type" v-model="baseAttr.value" :value="baseAttr.value"
                    @change="updateAttribute">
                <option v-for="item in baseAttr.data" :value="item.value">{{item.desc}}</option>
            </select>
            <div v-if="type == 'selects'">
                <ul v-on:click="activeHandle" ref="select-wrap" class="sft-select-wrap">
                    <li class="sft-select-item clearfix" :type="type"
                        v-for="(item, index) in baseAttr.data" :data-index="index">
                        <i class="icon icon-dagou"></i>
                        <div class="sft-select-item-input">
                            <input v-model="item.desc" class="sft-field-input sft-select-input" @input="updateAttribute"/>
                            <div class="icon sft-delete" @click="deleteHandle"></div>
                            <div class="sft-select-item-border"></div>
                        </div>
                    </li>
                </ul>
                <button class="sft-btn sft-btn-primary sft-add-select-item" @click="addSelectItemHandle">添加</button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../store';

    export default {
        name: 'selectField',
        data() {
            return {}
        },
        props: ['attr', 'title', 'type'],
        store,
        computed: {
            typeList() {

            },
            baseAttr() {
                let attr = Object.assign(this.attr);
                return attr;
            }
        },
        mounted() {
            let self = this;
            document.addEventListener('click', function (event) {
                if (!event.target.classList.contains('sft-select-input')) {
                    let lis = document.querySelectorAll('.sft-select-wrap li');
                    lis.forEach((value) => {
                        value.classList.remove('active');
                    });
                }

            });
        },
        methods: {
            updateAttribute(event) {
                const val = event.target.value;
                console.log(this.type)
                this.$store.commit('updateAttribute', {
                    type: this.type,
                    value: val
                });
            },
            addSelectItemHandle() {
                this.$store.commit('selectItemOperate', {type: 'add'});
            },
            activeHandle(event) {
                let target = event.target.parentElement.parentElement;
                let lis = this.$refs['select-wrap'].querySelectorAll('li');
                lis.forEach((value, index, listObj) => {
                    value.classList.remove('active');
                });
                if (target.nodeName == 'LI') {
                    target.classList.add('active');
                }
            },
            deleteHandle(event) {
                let parent = event.target.parentElement.parentElement;
                this.$store.commit('selectItemOperate', {type: 'reduce', idx: parent.getAttribute('data-index')});
            }
        }
    }
</script>

<style lang="scss">
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
            right:-16px;
        }

        &:hover {
            .sft-delete
            {
                display: block;
            }
        }
        &:hover,
        &:hover input{
            background-color: #f1f1f1;
        }

        &.active {
            input {
                border-bottom-color: #999999;
            }
            .sft-select-item-border{
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
