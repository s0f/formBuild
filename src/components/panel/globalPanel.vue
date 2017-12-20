<template>
    <div class="sft-setting-global">
        <div class="sft-panel-title">标题</div>
        <div class="sft-panel-content">
            <Field>
                <div class="sft-field-checkbox">
                    <div class="sft-field-checkbox-wrap">
                        <i class="icon icon-fangxingweixuanzhong"></i> 插入题号
                    </div>
                </div>
            </Field>
        </div>
    </div>
</template>
<script>
    import Field from './Field';

    export default {
        name: "globalPanel",
        data() {
            return {};
        },
        components: {
            Field
        },
    }
</script>
<style lang="scss" scoped>
</style>
