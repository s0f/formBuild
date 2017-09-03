<template>
<header id="header" class="header">
  <div class="flex header-in">
    <div class="flex-item header-left">Simple Form Tools</div>
    <div class="flex-item header-center">
      <ul class="header-nav">
        <li  v-for="(item,index) in headerList" :class="{active: $store.state.step==index}"><span class="header-nav_item">{{ index+1 }}</span>{{ item }}</li>
      </ul>
    </div>
    <div class="flex-item header-right">
      <div class="header-tools">
        <span class="header-tools_break">上一步</span>
        <span class="header-tools_next">下一步</span>
        <span class="header-tools_paint">预览</span>
      </div>
    </div>
  </div>
</header>
</template>

<script>
   
  import store from '../../store/';

    export default {
        name: 'header',
        store,
        data () {
            return {
              headerList: ['表头','内容','外观','提交后','发布']
            }
        }
    }
</script>

<style lang="scss"></style>
