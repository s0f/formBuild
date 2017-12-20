<template>
    <div id="app">
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in">
            <router-view class="animated fast"  v-loading="isLoading"></router-view>
        </transition>
    </div>
</template>

<script>
    import store from './store/index'
    export default {
        name: 'app',
        store,
        data(){
            return {
                loadingInstance: null
            }
        },
        computed: {
        	isLoading: function () {
                return this.$store.state.isLoading
            }
        }
    }
</script>

<style>
    #app {
        height: 100%;
        background-color: #f1f1f1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    .fade-enter {

    }

    .fade-enter-active {

    }
</style>
