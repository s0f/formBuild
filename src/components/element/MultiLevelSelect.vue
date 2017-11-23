<template>
    <div>
        <el-select :value="options.desc"
                   label="" v-model="options.desc">
            <el-option v-for="option in options.data" :label="option.desc"
                       :value="option.desc" :key="option.desc"></el-option>
        </el-select>
        <el-select v-model="twoValue">
            <el-option v-for="option in twoLevel.data" :label="option.desc"
                       :value="option.desc" :key="option.desc"></el-option>
        </el-select>
        <el-select v-model="threeValue" v-if="twoValue">
            <el-option v-for="option in threeLevel.data" :label="option.desc"
                       :value="option.desc" :key="option.desc"></el-option>
        </el-select>
    </div>
</template>
<script>

    export default {
        name: "multiLevelSelect",
        data() {
            return {
                options: {},
                twoValue: '',
                threeValue: ''
            };
        },
        props: ['data'],
        computed: {
            twoLevel: {
                get() {
                    for( let i =0, len = this.options.data.length; i < len; i++){
                        let current = this.options.data[i];
                        if(current.desc === this.options.desc){
                            return {
                                data: this.options.data[i].data
                            };
                        }
                    }
                    return {value: '', data:[], desc: ''}
                }
            },
            threeLevel: {
                get() {
                    for( let i =0, len = this.options.data.length; i < len; i++){
                        let current = this.options.data[i];
                        if(current.desc === this.options.desc){
                            for( let j = 0, len2 = current.data.length; j < len2; j++){
                                if(current.data[j].desc === this.twoValue){
                                    return {
                                        data: current.data[j].data
                                    }
                                }
                            }
                        }
                    }
                    return {value: '', data:[], desc: ''}
                }
            }
        },
        components: {
        },
        created() {
        	this.options = JSON.parse(JSON.stringify(this.data));
        },
        methods: {
        }
    }
</script>
<style lang="scss">
</style>
