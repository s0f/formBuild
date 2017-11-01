<template>
<div id="basePanel">
    <div class="stf-field-item">
        <span class="stf-field-title">标题</span>
        <div class="sft-field-content">
            <input type="text" v-model="title" class="sft-field-input" :placeholder="$store.state.elementList[$store.state.activeComponentRef].name">
        </div>
    </div>
    <div class="stf-field-item">
        <span class="stf-field-title">描述</span>
        <div class="sft-field-content">
            <input type="text" v-model="desc" class="sft-field-input">
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
                    if(this.$store.state.activeComponentRef != -1){
                        return this.$store.state.elementList[this.$store.state.activeComponentRef].name;
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
                    if(this.$store.state.activeComponentRef != -1){
                        return this.$store.state.elementList[this.$store.state.activeComponentRef].base.desc;
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
<style lang="scss">
</style>
