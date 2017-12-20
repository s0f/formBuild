<template>
    <SftElement type="commodity" :title="data.base.title"  :desc="data.base.desc">
        <div class="commodity">
            <span class="sft-country" v-if="data.property.country.value">
                <img :src="commodity.icon " alt="" v-if="commodity">
                <span>{{ commodity.name }}</span>
            </span>
            <span v-if="data.property.country.value === 0 || data.property.minLevel.value != '国家'">
                <div class="sft-select" v-if="data.property.type === 1">
                    <span class="sft-tip">请选择</span>
                    <span class="icon icon-arrow-bottom"></span>
                </div>
                <input type="text" disabled class="sft-input" title="" v-else/>
            </span>
        </div>
    </SftElement>
</template>
<script>
    import SftElement from './SftElement.vue';
    export default {
        name: 'Ecity',
        data () {
            return {
                imgPath: '/static/icon/'
            };
        },
        props: ['data'],
        components: {
            SftElement
        },
        computed: {
            commodity() {
                let commodityCode = -1;

                for( let i =0, len = this.$store.state.editor.country.length; i < len; i++){
                    if(this.$store.state.editor.country[i][0] === this.data.property.country.value ){
                        commodityCode = this.$store.state.editor.country[i];
                    }
                }
                console.log(commodityCode)
                if( commodityCode != -1) {
                    return {icon: this.imgPath + (commodityCode[0]) + '.gif', name: commodityCode[1]};
                } else {
                    return false;
                }
            }
        },
        created() {
        }
    }
</script>
<style lang="scss" scoped>
    .sft-country {
        display: inline-block;
        background-color: #f9f9f9;
        padding: 0 10px;
        border: 1px solid #ddd;
        font-size: 14px;
        color: #666;
        line-height: 30px;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
    .sft-input {
        width: 40%;
    }
    .sft-select {
        display: inline-block;
        width: 20%;
    }
</style>