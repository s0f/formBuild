<template>
    <SftElement type="commodity" :title="data.base.title"  :desc="data.base.desc">
        <ul class="sft-commodity">
            <li class="sft-commodity-item" v-for="commodity in data.property.list">
                <div class="sft-commodity-img" v-if="commodity.img"> <img :src="commodity.img" alt=""></div>
                <h4 class="sft-commodity-name">{{ commodity.name }}</h4>
                <p class="sft-commodity-desc">{{ commodity.desc }}</p>
                <div class="sft-commodity-info">
                    <div class="sft-commodity-money">{{ commodity.money | money }}</div>
                    <div class="sft-commodity-total">
                        <div class="sft-total">
                            <span class="total-add-btn"></span>
                            <input type="text" class="total-input" readonly :value="commodity.total">
                            <span class="total-reduce-btn"></span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </SftElement>
</template>
<script>
    import SftElement from './SftElement.vue';
    export default {
        name: 'Ecommodity',
        data () {
            return {
            };
        },
        props: ['data'],
        components: {
            SftElement
        },
        filters: {
            money(value) {
                if( value && value.toString().split('.')[1].length > 2 ) {
                    if( Math.round(value.toString().split('.')[1]/10) == 100 ){
                        value = Math.round(value);
                    } else {
                        value = Number.parseFloat(value).toFixed(2);
                    }
                    return Number.parseFloat(value).toFixed(2);
                } else {
                    return '0.00';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sft-commodity {
        overflow: hidden;
    }

    .sft-commodity-item {
        float: left;
        width: 32.7%;
        margin-right: .95%;

        padding: 2px;
        margin-top: 6px;
        background-color: #FFF;
        text-align: left;
        border: 1px solid #EBEBEB;
        box-sizing: border-box;

        &:nth-child(3n) {
            margin-right: 0;
        }
    }

    .sft-commodity-img {
        text-align: center;
        img {
            width: 100%;
        }
    }
    
    .sft-commodity-name {
        font-size: 14px;
        padding: 5px 3px;
        color: #000;
        line-height: 1.4;
    }

    .sft-commodity-desc {
        padding: 0 3px 3px;
        font-size: 12px;
        color: #666666;
        line-height: 1.2;
        box-sizing: border-box;
        white-space: pre-wrap;
    }

    .sft-commodity-info {
        position: relative;
        height: 22px;
        padding: 3px;
    }

    .sft-commodity-money {
        float: left;
        font-size: 14px;
        line-height: 20px;
        color: #DD805B;
    }

    .sft-commodity-total {
        float: right;
        padding-bottom: 5px;
    }

    .sft-total {
        overflow: hidden;
    }

    .total-add-btn,
    .total-reduce-btn {
        float: left;
        display: inline-block;
        border: 1px solid #efefef;
        width: 20px;
        height: 20px;
        background-color: #fff;
        line-height: 20px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        font-family: sans-serif;
        color: #999;
    }

    .total-add-btn {
        border-right: 0;
        &::before {
            content: '+';
        }
    }

    .total-reduce-btn {
        border-left: 0;
        &::before {
            content: '-';
        }
    }

    .total-input {
        float: left;
        width: 18px;
        height: 18px;
        border: 1px solid #efefef;
        text-align: center;
        outline: 0;
    }
</style>