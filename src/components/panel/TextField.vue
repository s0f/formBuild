<template>
    <Field title="输入框右侧文字（单位）">
        <input type="text" v-model="unit" class="sft-field-input" @blur="blurHandle" @focus="focusHandle">
    </Field>
</template>
<script>
    import Field from "./Field";
    export default {
        name: "TextField",
        data() {
            return {};
        },
        props: ['title'],
        components: {
            Field
        },
        computed: {
            unit: {
                get() {
                    return this.property.lastFix
                },
                set(value) {

                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'lastFix',
                        value: value
                    });
                }
            },
            property() {
                return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            }
        },
        methods: {
            blurHandle(event) {
                event.target.classList.remove('active');
            },
            focusHandle(event) {
                event.target.classList.add('active');
            }
        }
    };

</script>
<style lang="scss" scoped>


</style>
