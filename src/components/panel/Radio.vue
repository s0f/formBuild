<template>
    <Field :title="title">
        <ul>
            <li></li>
        </ul>
    </Field>
</template>
<script>
import Field from "./Field";
export default {
    name: 'Radio',
    data () {
        return {
        };
    },
    props: {
        title: String,
        data: Array
    },
    components: {
        Field
    },
}
</script>
<style lang="scss" scoped>
</style>