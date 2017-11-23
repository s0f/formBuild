<template>
    <el-tabs v-model="currentTab" type="border-card" :closable="closable" :addable="addable" @edit="handleTabsEdit"
             max="4" >
        <el-tab-pane v-for="tab in active.property.tabs.data" :label="tab.desc" :name="tab.value" :key="tab.value">
            <template v-if="tab.value === '1'">
                <Field :title="property.oneLevel.title">
                    <input type="text" title="标题" v-model="oneLevelTitle" class="sft-field-input"
                           placeholder="请选择"/>
                </Field>
                <MultiLineText :property="property.oneSelects" title="" updateKey="oneSelects"
                               btnName="添加选项"></MultiLineText>
            </template>
            <template v-if="tab.value === '2'">
                <Field title="当一级选择">
                    <selectField :property="property.oneSelects" updateKey="oneSelects" model="twoOne" placeholder="请选择" seize
                                 @changeType="changeLevel"></selectField>
                </Field>
                <template v-if="property.oneSelects.twoOne" name="twoSelect">
                    <Field :title="property.twoLevel.title">
                        <input type="text" title="标题" v-model="twoLevelTitle" class="sft-field-input"
                               placeholder="请选择"/>
                    </Field>
                    <MultiLineText v-for="(item, index) in property.oneSelects.data" :property="item"
                                   v-show="item.value===property.oneSelects.twoOne"
                                   :key="index" title="" updateKey="twoSelects" btnName="添加选项" seize
                                   v-on:selectItemOperate="addSelectItemHandle"></MultiLineText>
                </template>
            </template>
            <template v-if="tab.value === '3'">
                <Field title="当一级选择">
                    <selectField :property="property.oneSelects" updateKey="oneSelects" model="threeOne" @changeType="changeLevel" seize
                                 placeholder="请选择"></selectField>
                </Field>
                <Field title="且二级选择" v-if="property.oneSelects.threeOne">
                    <selectField :property="threeTwoData" updateKey="twoSelects" model="threeTwo"
                                 @changeType="changeLevel" seize placeholder="请选择" ref="twoLevel"></selectField>
                </Field>
                <template v-if="property.oneSelects.threeTwo" name="threeSelects">
                    <Field :title="property.threeLevel.title">
                        <input type="text" title="标题" v-model="twoLevelTitle" class="sft-field-input"
                               placeholder="请选择"/>
                    </Field>
                    <MultiLineText :property="currentItem" title="" updateKey="threeSelects" btnName="添加选项" seize
                                   v-on:selectItemOperate="addSelectItemHandle"></MultiLineText>
                </template>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Field from './Field';
    import MultiLineText from './MultiLineText';
    import selectField from './selectField';
    export default {
        name: 'multiSelect',
        data () {
            return {
                closable: true,
            }
        },
        components: {
            Field,
            MultiLineText,
            selectField
        },
        computed: {
            addable() {
            	return this.property.tabs.count < 3;
            },
            threeTwoData(){
                let current = this.property.oneSelects.data,
                    result = [];
            	for( let i =0, len =current.length; i < len; i++){
            		if(current[i].value === this.property.oneSelects.threeOne ){
            			result = current[i].data;
                    }
                }
                return {data: result, threeTwo: this.property.oneSelects.threeTwo};
            },
        	currentItem() {
        		let current = this.threeTwoData.data;
                for( let i =0, len= current.length; i< len; i++){
                	if( current[i].value === this.property.oneSelects.threeTwo ){
                		 return current[i];
                    }
                }
                return [];
            },
        	three(){
        		let arr = [];
        		this.property.oneSelects.data.forEach(function(item){
        			console.log(item.data,'xxx')
                    item.data&&item.data.forEach(function(two){
                        arr.push(two);
                    });
                });
        		return arr;
            },
            active() {
                return this.$store.getters.activeComponent;
            },
            property() {
                return this.active.property;
            },
            oneLevelTitle: {
                get() {
                    return this.property.oneLevel.value;
                },
                set(value) {
                    this.$store.commit('updateAttribute', {
                        type: 'oneLevel',
                        value: value
                    });
                }
            },
            twoLevelTitle: {
                get() {
                    return this.property.twoLevel.value;
                },
                set(value) {
                    this.$store.commit('updateAttribute', {
                        type: 'twoLevel',
                        value: value
                    });
                }
            },
            threeLevelTitle: {
                get() {
                    return this.property.threeLevel.value;
                },
                set(value) {
                    this.$store.commit('updateAttribute', {
                        type: 'threeLevel',
                        value: value
                    });
                }
            },
            currentTab: {
                get() {
                    return this.active.property.tabs.value;
                },
                set(value) {
                    this.$store.commit('updateAttribute', {
                        type: 'tabs',
                        value: value
                    });
                }
            }
        },
        created() {
        },
        errorCaptured() {
            console.log(arguments)
        },
        methods: {
            addSelectItemHandle(payload) {
            	let target = '',
                    parent = '';
            	switch (this.currentTab){
                    case '1':
                    	break;
                    case '2':
                        target = this.property.oneSelects.twoOne;
                        break;
                    case '3':
                    	parent = this.property.oneSelects.threeOne;
                        target = this.property.oneSelects.threeTwo;
                        break;
                }
                this.$store.commit('selectArrayItemOperate', {
                    type: payload.type,
                    updateKey: 'oneSelects',
                    value: target,
                    idx: payload.idx
                });
            },
            changeLevel(payload) {

                if (this.currentTab === '2') {
                    if (payload.type === 'oneSelects') {
                        this.$store.commit('updateAttribute',{
                        	value: payload.value,
                            type: 'oneSelects',
                            property: 'twoOne'
                        })
                    }
                }
                if (this.currentTab === '3') {
                    if (payload.type === 'oneSelects') {
                        this.$store.commit('updateAttribute',{
                            value: payload.value,
                            type: 'oneSelects',
                            property: 'threeOne'
                        });
                        this.$store.commit('updateAttribute',{
                            value: '',
                            type: 'oneSelects',
                            property: 'threeTwo'
                        });
                    }
                    if (payload.type === 'twoSelects') {
                        this.$store.commit('updateAttribute',{
                            value: payload.value,
                            type: 'oneSelects',
                            property: 'threeTwo'
                        })
                    }
                }
            },
            handleTabsEdit(targetName, action){
                let newTabName = this.property.tabs.count + 1;
                if (action === 'add') {
                    this.$store.commit('updateAttribute', {
                        value: newTabName,
                        type: 'tabs',
                        property: 'count'
                    });
                    newTabName+='';
                    this.$store.commit('addItem', {
                        value: {
                            desc: '三级',
                            value: newTabName
                        }
                    });
                    this.currentTab = newTabName;
                }
                if (action === 'remove') {
                    let tabs = this.property.tabs.data;
                    let activeName = this.currentTab;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.value === activeName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.value;
                                }
                            }
                        });
                    }

                    this.currentTab = activeName;
                    this.$store.commit('removeItem', {
                        value: tabs.filter(tab => tab.value !== targetName)
                    });
                }
                if (newTabName >= 3) {
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss">
    .el-tabs__item:nth-child(1) .el-icon-close,
    .el-tabs__item:nth-child(2) .el-icon-close {
        display: none;
    }
</style>
