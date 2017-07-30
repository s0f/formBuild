<template>
    <panel title="选择">
        <div class="stf-field-item"  slot="header">
            <span class="stf-fiedl-title">切换组件类型</span>
            <div class="sft-fiedl-content">
                <select name="" id="">
                    <option value="">单选</option>
                    <option value="">多选</option>
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
  name: "selectPanel",
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
</style>
