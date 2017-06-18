<template>
<header id="header" class="header">
  <div class="flex header-in">
    <div class="flex-item header-left">Simple Form Tools</div>
    <div class="flex-item header-center">
      <ul class="header-nav">
        <li><span class="header-nav_item">1</span>表头</li>
        <li><span class="header-nav_item">2</span>内容</li>
        <li><span class="header-nav_item">3</span>外观</li>
        <li><span class="header-nav_item">4</span>提交后</li>
        <li><span class="header-nav_item">5</span>发布</li>
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
    export default {
        name: '',
        data () {
            return {}
        }
    }
</script>

<style scoped lang="scss">
  @import "../../style/common";

  $active: #5a5a5a;

  .header{
    height: 50px;
    background: #151515;
    color: #b5b5b5;
    user-select: none;
    line-height: 50px;
  }
  .header-left{
  }
  .header-center{
    width: 800px;
    height: 50px;
    margin: 0 auto;

    .header-nav {
        overflow: hidden;
        li {
          float: left;
          padding: 0 20px;

          &.active,
          &:active,
          &:hover{
            background: #fff;
            cursor: pointer;
            .header-nav_item{
              background: $active;
              color: #fcfcfc;
            }
          }

          .header-nav_item {
            display: inline-block;
            margin-right: 10px;
            width: 16px;
            height: 16px;
            background: #fcfcfc;
            border-radius: 50%;
            text-align: center;
            line-height: 16px;
            vertical-align: middle;
            color: $active;
            font-size: 14px;
          }
        }
      }

  }
  .header-right {
    .header-tools{
      span{
        padding: 0 10px;
        cursor: pointer;

        &:active,
        &:hover{
          color: #fff;
        }
      }
    }
  }
</style>
