<template>
  <section class="stf-setting">
    <div class="stf-setting-wrap">
      <div class="stf-setting-global">
        <panel title="全局设置">
          <div class="stf-field-checkbox">
            <div class="stf-field-checkbox-wrap">
              <i class="icon icon-checkbox"></i>
              插入题号
            </div>
          </div>
        </panel>
      </div>
      <div class="stf-setting-other">
        <panel title="文本框">
          <div class="stf-field-input">
            <div class="stf-field-item">
              <span class="stf-fiedl-title">切换组件类型</span>
              <div class="sft-fiedl-content">
                <select name="" id="">
                  <option value="">单行文本</option>
                  <option value="">多行文本</option>
                </select>
              </div>
              </div>
              <div class="stf-field-item">
                <span class="stf-fiedl-title">标题</span>
                <div class="sft-fiedl-content">
                  <input type="text">
                </div>
              </div>
              <div class="stf-field-item">
                <span class="stf-fiedl-title">描述</span>
                <div class="sft-fiedl-content">
                  <input type="text">
                </div>
              </div>
            </div>
        </panel>
        </div>
      </div>
  </section>
</template>
<script>
import panel from '../../components/panel/panel';

export default {
  name: "homeSetting",
  data() {
    return {
    };
  },
  components: {
    panel
  },
  props: []
}
</script>
<style lang="scss" scoped>
.stf-setting {
  position: absolute;
  right: 0;

  width: 300px;
}

.stf-setting-global,
.stf-setting-other {
  margin-bottom: 10px;

  background-color: #fff;
  border: 1px solid #ddd;

  overflow: hidden;
  text-align: left;
}

.stf-field-checkbox-wrap {
  padding: 5px 10px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #666;
}

.stf-fiedl-title {
  font-size: 14px;
  color: #666;
}

.icon-checkbox {
  font-size: 20px;
  color: #999;
  vertical-align: middle;
  cursor: pointer;
}
</style>