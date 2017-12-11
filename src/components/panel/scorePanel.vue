<template>
<div class="score-panel">
    <Field title="图标">
        <ul ref="scoreWrap">
            <li v-for="item in scoreList" :class="[property.icon === item ? 'active': '']" @click="toggleIcon"><div :class="['score-item', 'score-item_'+item]"></div></li>
        </ul>
    </Field>
    <Field title="最大分值" type="inline">

        <tooltip :show="limitDisable" :content="maxTipContent" type="error">
            <input type="text" title="最大分值" v-model="maxValue" class="sft-field-input" autocomplete="off"/>
        </tooltip>
    </Field>
    <Field title="默认分值" type="inline">
        <tooltip :show="disabled" content="不能大于最大分值" type="error">
            <input type="text" title="默认分值" v-model="minValue" class="sft-field-input" autocomplete="off"/>
        </tooltip>
    </Field>
</div>
</template>
<script>
    import $ from '../../common/query.js';
    import Field from "./Field";
    import tooltip from "../element/tooltip";
    console.log(tooltip)
    export default {
        name: 'scorePanel',
        data() {
            return {
                disabled: false,
                limitDisable: false
            };
        },
        components: {
            Field,
            tooltip
        },
        computed: {
            maxTipContent() {
                if(this.maxValue > this.property.limit){
                    return '请输入小于'+this.property.limit+'的数字';
                }
                if(this.maxValue < this.property.minValue ){
                    return  '不能小于默认值';
                }
            },
            scoreList(){
                return this.$store.state.scoreList;
            },
            maxValue: {
                get() {
                    return this.property.maxValue;
                },
                set(value) {
                    if ( value > this.property.limit ) {
                        this.limitDisable = !this.limitDisable;
                        value = 5;
                    } else if( value < this.property.minValue ) {
                        this.limitDisable = true;
                    } else {
                        this.limitDisable = false;
                        this.disabled = false;
                    }
                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'maxValue',
                        value: Number.parseInt(value)
                    });
                }
            },
            minValue: {
                get() {
                    return this.property.minValue;
                },
                set(value) {
                    let tempValue = value;
                    if( value > this.maxValue ){
                        // tempValue = this.property.defaultValue;
                        this.disabled = true;
                    } else {
                        this.disabled = false;
                        this.limitDisable = false;
                    }
                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'minValue',
                        value: Number.parseInt(tempValue)
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
            toggleIcon(event) {
                this.$store.commit('updateAttribute', {
                    easy: true,
                    type: 'icon',
                    value: this.scoreList[$.index(this.$refs.scoreWrap, event.currentTarget)]
                });
            }
        }
    };

</script>
<style lang="scss" scoped>
    ul{
        display: flex;
        justify-content: left;
        text-align: center;
    }
    li{
        width: 50px;
        border: 1px solid #efefef;
        margin-right: -1px;

        &:hover,&.active{
            background-color: #ddd;
        }
    }
    .score-item{
        margin: 0 auto;
        width: 30px;
        height: 30px;
        background: url('../../assets/sprite.png') left top no-repeat;
        cursor: pointer;
        vertical-align: middle;
    }
    .score-item_start{
        background-position: -83px -119px;
    }
    .score-item_love{
        background-position: -162px -119px;
    }
    .score-item_parise{
        background-position: -122px -119px;
    }
    .score-item_flower{
        width: 40px;
        background-position: -545px -119px;
    }
    .score-item_progress{
        width: 34px;
        background-position: -196px -119px;
    }
    .score-item_number{
        width: 40px;
        background-position: -587px -119px;
    }
    .sft-field-input{
        width: 100%;
    }
</style>
