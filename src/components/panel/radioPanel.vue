<template>
    <panel title="选择">
        <div class="stf-field-item" slot="header">
            <span class="stf-field-title">切换组件类型</span>
            <div class="sft-field-content">
                <select name="" id="" v-model="selectModel">
                    <option value="0">单选</option>
                    <option value="1">多选</option>
                </select>
            </div>
        </div>

        <div slot="content">
            <p class="stf-field-title">选项内容</p>
            <ul>
                <li class="sft-select-item"
                    v-for="(item, index) in $store.state.elementList[$store.state.activeComponentRef].selects" :data-index="index">
                    <i class="icon icon-dagou"></i><input v-model="item.desc" class="sft-field-input"/>
                </li>
            </ul>
        </div>
    </panel>
</template>
<script>

    import store from '../../store';

    export default {
        name: "radioPanel",
        store,
        data() {
            return {}
        },
        computed: {
            selectModel: {
                get() {
                    return this.$store.state.elementList[this.$store.state.activeComponentRef].base.value;
                },
                set(value) {
                    this.$store.commit('updateSelect', {
                        value: value
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
