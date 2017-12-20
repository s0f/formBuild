<template>
    <SftElement :type="data.base.type" :title="data.base.title" :desc="data.base.desc" class="row">
        <el-row>
            <el-col :span="12">
                <div class="sort-left">
                    <ul>
                        <li v-for="(item, index) in data.property.selects.data">
                            <span>{{ index + 1 }}</span>
                            <div>xx</div>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12"><div class="sort-right">
                <ul>
                    <li v-for="(item, index) in data.property.selects.data">
                        <p>{{ item.desc }}</p>
                        <i class="sort-icon"></i>
                    </li>
                </ul>
            </div></el-col>
        </el-row>
    </SftElement>
</template>
<script>
    import SftElement from './SftElement.vue';

    export default {
        name: 'Esort',
        data () {
            return {
            };
        },
        props: ['data'],
        components: {
            SftElement
        }
    }
</script>
<style lang="scss" scoped>
    .sort-left{
        padding: 8px;
        background-color: #F9FAFB;
        box-sizing: border-box;
        border: 1px solid #D3D3D3;
        ul{
            text-align: center;
        }
        li{
            position: relative;
            margin-bottom: 10px;
            min-height: 27px;
            line-height: 1.4;
            font-weight: normal;
            color: #000000;

            &:last-child{
                margin-bottom: 0;
            }

            span{
                position: absolute;
                display: inline-block;
                left: 0;
                width: 31px;
                padding-top: 6px;
                padding-bottom: 6px;
                color: #fff;
                background-color: #D3D3D3;
            }
            div{
                margin-left: 34px;
                padding: 5px;
                background-color: #EBEBEB;
                border: 1px dashed #D3D3D3;
            }
        }
    }
    .sort-right{
        padding: 10px 0 10px 10px;
        li{
            position: relative;
            padding: 5px;
            background-color: #fff;
            margin-bottom: 10px;
            border: 1px solid #D3D3D3;
            box-sizing: border-box;
            min-height: 27px;
            line-height: 1.4;
            font-weight: normal;
            color: #000000;

            &:last-child{
                margin-bottom: 0;
            }
        }
    }
    .sort-icon {
        cursor: default;
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 22px;
        margin-right: 2px;
        background: url(../../assets/formCom.png) -158px center no-repeat;
    }
</style>