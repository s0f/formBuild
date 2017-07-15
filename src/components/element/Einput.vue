<template>
  <SftElement type="input">
    <div class="sft-element-title">{{ title }}</div>
    <div class="sft-element-content">
      <input type="text" disabled class="sft-input" title=""/>
    </div>
  </SftElement>
</template>
<script>
import SftElement from './SftElement.vue';

export default {
  name: "EInput",
  data() {
    return {
    };
  },
  props: {
    title: {
      type: String,
      default: '文本框'
    },
    desc: {
      type: String,
      default: ''
    }
  },
  components: {
    SftElement
  }
}
</script>
<style lang="scss">
  .sft-input{
        width: 80%;
        height: 30px;
        line-height: 30px;

        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
</style>
