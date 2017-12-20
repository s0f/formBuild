<template>
    <SftElement type="input" :title="data.base.title"  :desc="data.base.desc">
        <div class="sft-element-content">
            <div class="sft-element-in">
                <template v-if="data.base.element === 'dateTime_date'">
                    <inputIcon icon="&#xe604;" class="sft-input-prefix"></inputIcon>
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
                    <Score :scoreList="scoreList" :maxValue="data.property.maxValue" :minValue="data.property.minValue" :currentIcon="currentIcon"></Score>
                </template>
                <template v-if="data.base.element === 'currency'">
                    <inputIcon :icon="data.property.changeType.value.split(' ')[0]" class="sft-input-prefix"></inputIcon>
                    <input type="text" disabled class="sft-input" title=""/>
                </template>
                <template v-if="data.base.element === 'enclosure'">
                    <inputIcon icon="+" class="sft-input-prefix"></inputIcon>
                    <input type="text" disabled class="sft-input sft-upload" title="" placeholder="上传文件（需小于 500M）"/>
                </template>
            </div>
        </div>
    </SftElement>
</template>
<script>
    import store from '../../store';
    import SftElement from './SftElement.vue';
    import inputIcon from './inputIcon.vue';
    import Score from './Score.vue';

    export default {
        name: "EInput",
        store,
        data() {
            return {};
        },
        props: ['data'],
        components: {
            SftElement,
            inputIcon,
            Score
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
        height: 34px;
        line-height: 34px;

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
    .sft-upload {
        &::-webkit-input-placeholder{
            padding-left: 30px;
        }
        &::-moz-placeholder{
            padding-left: 30px;
        }
        &:-ms-input-placeholder{
            padding-left: 30px;
        }
    }
</style>
