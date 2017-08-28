<template>
    <div class="stf-field-item" slot="header">
        <span class="stf-field-title">切换组件类型</span>
        <div class="sft-field-content">
            <select name="" id="" class="sft-field-select" v-model="isTextArea">
                <option value="0">单行文本</option>
                <option value="1">多行文本</option>
            </select>
        </div>
    </div>
</template>
<script>
    import store from '../../store';
    export default {
        name: "textPanel",
        store,
        data() {
            return {};
        },
        computed: {
            isTextArea: {
                get() {
                    return this.$store.state.elementList[this.$store.state.activeComponentRef].isTextArea;
                },
                set(value) {
                    this.$store.commit('updateIsTextArea', {
                        value: value
                    });
                }
            }
        }
    }
</script>
<style lang="scss">
</style>
