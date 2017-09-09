<template>
<header id="header" class="header">
  <div class="flex header-in">
    <div class="flex-item header-left">Simple Form Tools</div>
    <div class="flex-item header-center">
      <ul class="header-nav">
        <li v-for="(item,index) in headerList" :class="{active: $store.state.step==index+1}" @click="toggle" :data-index="index+1">
          <span class="header-nav_item">{{ index+1 }}</span>{{ item }}
        </li>
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
        },
        computed: {
          step() {
            return this.$store.state.step;
          }
        },
        methods: {
          previou() {
            if(step == 0){}
          },
          next() {
          },
          preview() {
          },
          toggle() {
            let idx = Number.parseInt(event.target.getAttribute('data-index'));
            switch(idx){
              case 1:
              this.$router.push({name: 'formHeader'});
              break;
              case 2:
              this.$router.push({name: 'formContent'});
              break;
              case 3:
              this.$router.push({name: 'formStyle'});
              break;
              case 4:
              this.$router.push({name: 'formSubmited'});
              break;
              case 5:
              this.$router.push({name: 'formRelease'});
              break;
            }
            this.$store.commit('updateStep', {step: idx});
          }
      }
    }
</script>

<style lang="scss"></style>
