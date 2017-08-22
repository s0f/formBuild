<template>
    <panel title="下拉">
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
            <ul>
                <li class="sft-select-item"><i class="icon icon-dagou"></i><input value="选项1" /></li>
                <li class="sft-select-item"><i class="icon icon-dagou"></i><input value="选项2" /></li>
                <li class="sft-select-item"><i class="icon icon-dagou"></i><input value="选项3" /></li>
                <li class="sft-select-item"><i class="icon icon-dagou"></i><input value="选项4" /></li>
            </ul>
        </div>
    </panel>
</template>
<script>
export default {
  name: "selectPanel",
  data () {
    return {
        selectModel: 0
    };
  }
}
</script>
<style lang="scss">
    .sft-select-item{
        margin-bottom: 4px;
        input{
            padding-left: 6px;
            height: 20px;
            line-height: 20px;
            color: #666;
            border: 1px solid #dfdfdf;
        }
        
        .icon-dagou{
            color: #ddd;
            margin-right: 6px;
        }
    }

</style>
