<template>
    <Field slot="header" :title="_property.name" :type="size">
        <!--  <select v-if="type == 'base'" :type="type" v-model="baseAttr.value" :value="baseAttr.value"
                    @change="updateAttribute">
                <option v-for="item in baseAttr.data" :value="item.value">{{item.desc}}</option>
            </select>-->
        <el-select :type="updateKey" v-model="value" size="small"  @change="updateAttribute" v-if="easy == undefined">
            <el-option
                v-for="item in typeMap"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
                value-key="value">
            </el-option>
        </el-select>
        <el-select :type="updateKey" v-model="value" size="small"  @change="updateAttribute" v-else>
            <el-option
                v-for="(item, index) in listData"
                :key="index"
                :label="item"
                :value="item"
                :value-key="item">{{item}}
            </el-option>
        </el-select>
    </Field>
</template>

<script>
    import store from '../../store';
    import Field from './Field';

    export default {
        name: 'selectField',
        data() {
            return {
                tvalue: '',
                modelAttr: ''
            }
        },
        props: ['property', 'data', 'updateKey', 'model', 'show', 'size', 'seize', 'easy'],
        store,
        computed: {
            listData() {
                return this.data || this.property.data;
            },
            value: {
                get() {
                	if(this.model){
                        return this.property[this.model];
                    } else{
                		return this.property.value;
                    }
                },
                set(value) {
                    const params = {
                        type: this.updateKey,
                        value: value
                    };
//                    this.tvalue = value
                    this.$emit('changeType', params);
//                    this.$store.commit('updateAttribute', params);
                }
            },
            typeMap() {
                let result = [];
                if (!this.show) {
                    return this._property.data;
                }

                for (let i = 0, len = this._property.data.length; i < len; i++) {
                    for (let j = 0, len2 = this.show.length; j < len2; j++) {
                        if (this._property.data[i].value === this.show[j]) {
                            result.push(this._property.data[i]);
                        }
                    }
                }
                return result;
            },
            _property() {
                return JSON.parse(JSON.stringify(Object.assign({},this.property)));
            }
        },
        created(){
            this.value = this.property.value;
//            this._property = JSON.parse(JSON.stringify(Object.assign({},this.property)));
        },
        mounted()
        {
            let self = this;
            document.addEventListener('click', function (event) {
                if (!event.target.classList.contains('sft-select-input')) {
                    let lis = document.querySelectorAll('.sft-select-wrap li');
                    lis.forEach((value) => {
                        value.classList.remove('active');
                    });
                }

            });
            this.$on('reset', function (value) {
                this.value = value;
                this.$store.commit('updateAttribute', {
                	type: this.updateKey,
                    value: this.property.value
                })
            });
        },
        components: {
            Field
        },
        methods: {
            updateAttribute(value) {
                const params = {
                    type: this.updateKey,
                    value: value
                };
                this.tvalue = params.value;
                if( this.seize === '' ){
                    this.$emit('changeType', params);
                } else {
                    this.$store.commit('updateAttribute', params);
                }

            },
            activeHandle(event) {
                let target = event.target.parentElement.parentElement;
                let lis = this.$refs['select-wrap'].querySelectorAll('li');
                lis.forEach((value, index, listObj) => {
                    value.classList.remove('active');
                });
                if (target.nodeName === 'LI') {
                    target.classList.add('active');
                }
            }

        }
    }
</script>

<style lang="scss">

</style>
