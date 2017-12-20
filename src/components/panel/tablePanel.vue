<template>
    <div>
        <selectField :property="active.property.selects" updateKey="selects" @changeType="changeSelectType"></selectField>
        <MultiLineText seize :property="active.property.colSelects" :title="active.property.colSelects.title" @selectItemOperate="addItemHandle" updateKey="colSelects"></MultiLineText>
        <MultiLineText seize :property="active.property.columnSelects" :title="active.property.columnSelects.title" @selectItemOperate="addItemHandle" updateKey="columnSelects"></MultiLineText>
        <scorePanel v-if="active.property.selects.value === 'start'" @changeIcon="changeHandle"></scorePanel>
    </div>
</template>
<script>
    import MultiLineText from './MultiLineText';
    import selectField from './selectField';
    import scorePanel from './scorePanel';

    export default {
        name: 'tablePanel',
        data () {
            return {
            };
        },
        computed: {
        	active() {
                return this.$store.getters.activeComponent;
            }
        },
        components: {
            MultiLineText,
            selectField,
            scorePanel
        },
        methods: {
            addItemHandle (payload) {
                let tableCol = [];
                if( payload.updateKey === 'columnSelects'){
                    for( let idx = 0, len = this.active.property.colSelects.data.length; idx < len; idx++ ){
                        tableCol.push({type: 'radio'});
                    }
                    this.$store.commit('selectItemOperate', {type: 'add', data: tableCol, updateKey: payload.updateKey});
                } else {
                    this.$store.commit('selectItemOperate', {type: 'add', data: [], updateKey: payload.updateKey});
                    this.$store.commit('updateTableColumn', {type: 'add', data: {type: 'radio'}, updateKey:'columnSelects'});
                }
                
            },
            changeSelectType (payload) {
                if(payload.value != 'start'){
                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'icon',
                        value: ''
                    });
                } else {
                    console.log(payload.value)
                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'icon',
                        value: 'start'
                    });
                }
            },
            changeHandle (payload) {
                this.$store.commit('updateAttribute', {
                    easy: true,
                    type: 'icon',
                    value: payload.value
                });
            }
        }
    }
</script>
<style lang="css" scoped>
</style>