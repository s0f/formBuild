<template>
<div id="basePanel">
    <Field title="标题">
        <input type="text" title="标题" v-model="title" class="sft-field-input" :placeholder="$store.state.elementList[$store.state.activeComponentRef].base.title" @blur="blurHandle" @focus="focusHandle" />
    </Field>
    <Field title="描述">
        <input type="text" title="描述" v-model="desc" class="sft-field-input"  @blur="blurHandle" @focus="focusHandle"/>
    </Field>
</div>
</template>
<script>
    import store from '../../store';
    import Field from './Field';

    export default {
        name: "basePanel",
        store,
        data: () => ({
        }),
        computed: {
            title: {
                get() {
                    if(this.$store.state.activeComponentRef !== -1){
                        return this.$store.state.elementList[this.$store.state.activeComponentRef].base.title;
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
                    if(this.$store.state.activeComponentRef !== -1){
                        return this.$store.state.elementList[this.$store.state.activeComponentRef].base.desc;
                    } else {
                        return '';
                    }
                },
                set(value) {
                    this.$store.commit('updateProperty', {desc: value});
                }
            }
        },
        components: {
            Field
        },
        methods: {

            blurHandle(event) {
                event.target.classList.remove('active');
            },
            focusHandle(event) {
                event.target.classList.add('active');
            }
        }
    }
</script>
<style lang="scss">
</style>
