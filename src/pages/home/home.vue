<template>
    <div id="form">
        <headTo></headTo>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut" mode="out-in">
            <keep-alive>
                <router-view class="animated fast"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    import headTo from '../../components/header/header'
    export default {
        name: "form",
        data: () => ({
        }),
        components: {
            headTo
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style lang="scss">
</style>
