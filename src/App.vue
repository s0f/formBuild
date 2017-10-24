<template>
    <div id="app">
        <headTo></headTo>
        <transition appear enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in"
                    v-on:before-enter="beforeHandle" v-on:after-enter="enterHandle">
            <keep-alive>
                <router-view class="animated fast"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import headTo from './components/header/header'
    import store from './store/index'
    export default {
        name: 'app',
        store,
        data(){
            return {
                loadingInstance: null
            }
        },
        components: {
            headTo
        },
        methods: {
            beforeHandle(){
                this.loadingInstance = this.$loading({
                    text: '正在加载中',
                    fullscreen: this.fullscreenLoading
                });
            },
            enterHandle(){
                this.loadingInstance.close();
            }
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

    .fade-enter {

    }

    .fade-enter-active {

    }
</style>
