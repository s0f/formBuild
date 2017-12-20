<template>
    <div class="sft-field-item">
        <span class="sft-field-title">{{ title }}</span>
        <div class="sft-field-content">
            <el-checkbox-group v-model="checkValues">
                <el-checkbox v-for="(item, index) in typeMap" :label="item.value" :key="index"  @change="changeHandle">{{ item.desc }}</el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data () {
            return {
                checkTitles: []
            }
        },
        props: ['title', 'property', 'show'],
        computed: {
            typeMap() {
                let result = [];
                for (let i = 0, len = this.checkTitles.length; i < len; i++) {
                    for (let j = 0, len2 = this.show.length; j < len2; j++) {
                        if (this.checkTitles[i].value === this.show[j]) {
                            result.push(this.checkTitles[i]);
                        }
                    }
                }
                if (!this.show.length) {
                    return this.checkTitles;
                } else {
                    return result;
                }
            },
            checkValues: {
            	get() {
            		return this.property.value;
                },
                set(value) {
                    this.$store.commit('updateAttribute', {
                        type: 'changeDateFormat',
                        value: value
                    });
                }
            }
        },
        created: function () {
            this.checkTitles = JSON.parse(JSON.stringify(Object.assign(this.property.data)));
        },
        methods: {
            changeHandle (value, event){
            	let params = {
                    type: 'changeDateFormat',
                    value: value,
                    targetValue: event.target.value
                };
                this.$emit('change', params);
//                this.$store.commit('updateAttribute', params);
            }
        }
    }
</script>

<style scoped>
    .el-checkbox {
        margin-left: 0;
        width: 33.33%;
    }
</style>
