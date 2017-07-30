<template>
<div id="basePanel">
    <div class="stf-field-item">
        <span class="stf-field-title">标题</span>
        <div class="sft-field-content">
            <input type="text" v-model="title">
        </div>
    </div>
    <div class="stf-field-item">
        <span class="stf-fiedl-title">描述</span>
        <div class="sft-fiedl-content">
            <input type="text" v-model="desc">
        </div>
    </div>
</div>
</template>
<script>
    import store from '../../store';

    export default {
        name: "basePanel",
        store,
        data: () => ({
        }),
        computed: {
            title: {
                get() {
                    console.log(this.$store)
                    if(this.$store.state.activeComponentRef){
                        return state.elementList[state.activeComponentRef].base.title;
                    } else {
                        return '';
                    }
                },
                set(value) {
                    this.$store.commit('updateProperty', {title: value});
                }
            },
            desc: {
                get() {
                    if(this.$store.state.activeComponentRef){
                        return state.elementList[state.activeComponentRef].base.desc;
                    } else {
                        return '';
                    }
                },
                set(value) {
                    this.$store.commit('updateProperty', {desc: value});
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
