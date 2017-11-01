<template>
<header id="header" class="header">
  <div class="flex header-in">
    <div class="flex-item header-left">Simple Form Tools</div>
    <div class="flex-item header-center">
      <ul class="header-nav">
          <router-link  v-for="(item,index) in headerList" :key="index+1"
                        :to="item.name" tag="li" active-class="active">
              <span class="header-nav_item">{{ index+1 }}</span>
              {{ item.title }}
           </router-link>
      </ul>
    </div>
    <div class="flex-item header-right">
      <div class="header-tools" v-if="false">
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
              headerList: [{title: '表头', name: 'formHeader'},
                  {title: '内容', name: 'formEdit'},
                  {title: '发布', name: 'formRelease'}]//['表头','内容','外观','提交后','发布']
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
          toggle(event) {
          	event.stopPropagation();
            let idx = Number.parseInt(event.target.getAttribute('data-index'));
            switch(idx){
              case 1:
              this.$router.push({name: 'formHeader'});
              break;
              case 2:
              this.$router.push({name: 'formEdit'});
              break;
             /* case 3:
              this.$router.push({name: 'formStyle'});
              break;
              case 4:
              this.$router.push({name: 'formSubmited'});
              break;*/
              case 3:
              this.$router.push({name: 'formRelease'});
              break;
            }
            this.$store.commit('updateStep', {step: idx});
          }
      }
    }
</script>

<style lang="scss"></style>
