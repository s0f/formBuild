<template>
    <SftElement type="input" :title="data.base.title" :desc="data.base.desc">
        <table class="sft-table">
            <tbody>
                <tr v-for="(cloumn, index) in table">
                    <td v-if="index === 0"></td>
                    <td v-for="(item, key) in cloumn">
                        <div v-if="typeof item === 'string'">{{item}}</div>
                        <div v-else>
                            <input v-if="currentIcon === 'radio'" type="radio"/>
                            <input v-else-if="currentIcon === 'checkbox'" type="checkbox"/>
                            <div v-else-if="currentIcon === 'fill'" class=""><input type="text"></div>
                            <Score v-else :scoreList="$store.state.scoreList" :maxValue="data.property.maxValue" :minValue="data.property.minValue" :currentIcon="currentIcon"></Score>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </SftElement>
</template>
<script>
    import SftElement from './SftElement.vue';
    import Einput from './Input.vue';
    import Score from './Score.vue';

    export default {
        name: 'ETable',
        data () {
            return {
            };
        },
        props: ['data'],
        components: {
            SftElement,
            Einput,
            Score
        },
        computed: {
            currentIcon() {
                return this.data.property.icon ? this.data.property.icon : this.data.property.selects.value;
            },
        	active() {
                return this.$store.getters.activeComponent;
            },
            table () {
                let tableData = [[]];
                this.data.property.colSelects.data.forEach((trItem, index) => {
                    tableData[0].push(trItem.desc);
                });
                
                this.data.property.columnSelects.data.forEach((tdItem, index) => {
                    index += 1;
                    if(!tableData[index]){
                        tableData[index] = [];
                    }
                    tableData[index].push(tdItem.desc);
                    tableData[index].push(...tdItem.data);
                });
                return tableData;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sft-table{
        width: 96%;
        background-color: #fff;
        border-collapse:collapse;
        font-size: 14px;
        td{
            padding: 5px 14px;
            line-height: 24px;
            text-align: center;
        }
        &,td,th{
            border: 1px solid #efefef;
        }
    }
</style>