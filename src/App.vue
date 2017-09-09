<template>
  <div id="app">
    <headTo></headTo>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <keep-alive>
            <router-view class="animated"></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
import headTo from './components/header/header'
export default {
  name: 'app',
  components: {
      headTo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.fade-enter{

}
.fade-enter-active{

}
</style>
