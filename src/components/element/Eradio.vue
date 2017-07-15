<template>
  <SftElement type="radio">
    <div class="sft-element-title">选择</div>
    <div class="sft-element-content">
      <ul>
          <li>
              <p><i class="icon icon-iconfontradiobox"></i><span class="sft-radio-text">选项一</span></p>
          </li>
      </ul>
    </div>
  </SftElement>
</template>
<script>
import SftElement from './SftElement.vue';

export default {
  name: "Eradio",
  data() {
    return {
    };
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