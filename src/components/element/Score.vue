<template>
    <ul>
        <li v-for="(scoreItem, index) in scoreList" :key="index" v-if="index < 4 && currentIcon === scoreItem">
            <span v-for="item in maxValue" :class="['score-item', 'score-item_'+scoreItem, item<= minValue ? 'score-item_selected' :'']"></span>
        </li>
        <li v-else-if="index===4 && currentIcon === scoreItem">
            <div :class="'score-item_'+scoreItem">
                <span v-for="item in maxValue" :class="[scoreItem+'-item_child', item <= minValue ? 'score-item_selected' :'']"></span>
            </div>
        </li>
        <li v-else-if="index===5 && currentIcon === scoreItem">
            <div :class="'score-item_'+scoreItem">
                <span v-for="item in maxValue" :class="[scoreItem+'-item_child', item <= minValue ? 'score-item_selected' :'']">{{item}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Score',
    data () {
        return {
        };
    },
    props: ['scoreList', 'maxValue', 'minValue', 'currentIcon'],
    computed: {
        property() {
            return this.active.property;
        },
        active() {
            return this.$store.getters.activeComponent;
        },
    }
}
</script>
<style lang="scss" scoped>

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