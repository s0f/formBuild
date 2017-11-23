<template>
<div>
    <headerDefault></headerDefault>
</div>
</template>
<script>
import headerDefault from '../../components/header/headerDefault';

export default {
    name: "index",
    data() {
        return {
        };
    },
    components: {
        headerDefault
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .header-tools a {
        color: #999;
    }
    .login-form{
        min-width: 200px;
        width: 24%;
        text-align: left;
        ul>li{
            span{}
        }
    }
    .background-black {
        background-color: #324057;
    }
</style>
