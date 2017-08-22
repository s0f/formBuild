<template>
    <panel title="选择">
        <div class="stf-field-item"  slot="header">
            <span class="stf-field-title">切换组件类型</span>
            <div class="sft-field-content">
                <select name="" id="" v-model="selectModel">
                    <option value="0">单选</option>
                    <option value="1">多选</option>
                </select>
            </div>
        </div>

        <div slot="content">
            <p>选项内容</p>
        </div>
    </panel>
</template>
<script>
export default {
  name: "radioPanel",
  data () {
    return {
        selectModel: 0
    };
  }
}
</script>
<style lang="scss" scoped>
</style>
