<template>
    <SftElement type="input" :title="data.base.title"  :desc="data.base.desc">
        <div class="sft-element-content">
            <div class="sft-element-in">
                <inputIcon :type="data.base.element" class="sft-input-prefix"></inputIcon>
                <template v-if="data.base.element === 'dateTime_date'">
                    <input type="text" disabled class="sft-input" title=""/>
                </template>
                <template v-if="data.base.element === 'text'">
                    <div class="sft-textarea" v-if="data.property.changeType.value -1 === 1"></div>
                    <input type="text" disabled class="sft-input" title="" v-else/>
                </template>
                <template  v-if="data.base.element === 'number'">
                    <input type="text" disabled class="sft-input" title=""/>
                    <span v-if="data.property.lastFix" class="sft-input-lastfix">{{data.property.lastFix}}</span>
                </template>
                <template  v-if="data.base.element === 'score'">
                    <ul>
                        <li v-for="(scoreItem, index) in scoreList" :key="index" v-if="index < 4 && currentIcon === scoreItem">
                            <span v-for="item in data.property.maxValue" :class="['score-item', 'score-item_'+scoreItem, item<=data.property.minValue ? 'score-item_selected' :'']"></span>
                        </li>
                        <li v-else-if="index===4 && currentIcon === scoreItem">
                            <div :class="'score-item_'+scoreItem">
                                <span v-for="item in data.property.maxValue" :class="[scoreItem+'-item_child', item<=data.property.minValue ? 'score-item_selected' :'']"></span>
                            </div>
                        </li>
                        <li v-else-if="index===5 && currentIcon === scoreItem">
                            <div :class="'score-item_'+scoreItem">
                                <span v-for="item in data.property.maxValue" :class="[scoreItem+'-item_child', item<=data.property.minValue ? 'score-item_selected' :'']">{{item}}</span>
                            </div>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';
    import inputIcon from './inputIcon.vue';

    export default {
        name: "EInput",
        store,
        data() {
            return {};
        },
        props: ['data'],
        components: {
            SftElement,
            inputIcon
        },
        computed: {
            currentIcon() {
                return (this.data && this.data.property.icon) || '';
            },
            property() {
				return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            },
            scoreList() {
                return this.$store.state.scoreList
            }
        }
    }
</script>
<style lang="scss">
    @import '../../style/var';

    .sft-element-in{
        position: relative;
        width: 80%;
    }
    .sft-input-prefix{
        position: absolute;
        left: 10px;
        top: 10px;

        .icon{
            font-size: $f-size-big;
            color: #4169e1;
        }
    }
    .sft-input-lastfix{
        position: absolute;
        right: 10px;
        top: 10px;
        @include textOver(8em);
    }
    .sft-input {
        width: 100%;
        height: 30px;

        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
    .sft-textarea{
        width: 80%;
        height: 90px;
        background-color: #f9f9f9;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
    }
    .score-item{
        display: inline-block;
        margin: 0 4px;
        width: 28px;
        height: 30px;
        background: url('../../assets/formCom.png') -236px center no-repeat;
        cursor: pointer;
        vertical-align: middle;
    }
    .score-item_start.score-item_selected{
        background-position: -180px center;
    }
    .score-item_love.score-item_selected{
        background-position: -320px center;
    }
    .score-item_parise.score-item_selected{
        background-position: -264px center;
    }
    .score-item_flower.score-item_selected{
        background-position: -552px center;
    }
    .score-item_progress.score-item_selected{

    }
    .score-item_love{
        background-position: -348px center;
    }
    .score-item_parise{
        background-position: -292px center;
    }
    .score-item_flower{
        width: 40px;
        background-position: -580px center;
    }
    .score-item_progress{
        display: flex;
        .progress-item_child{
            flex: 1;
            margin-right: 4px;
            height: 18px;
            background-color: #fff;
            border: 1px solid #dfdfdf;
        }
    }
    .score-item_number{
        .number-item_child{
            display: inline-block;
            margin-right: -1px;
            width: 28px;
            height: 28px;
            background-color: #fff;
            line-height: 28px;
            text-align: center;
            border: 1px solid #dfdfdf;
        }
    }
</style>
