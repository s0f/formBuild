<template>
    <div id="review" class="review">
        <el-container class="review-in review-form" v-loading="isLoading">
            <el-header><h1>{{ form.formName }}</h1></el-header>
            <el-main>
                <el-form ref="form" label-width="100%" label-position="top" size="small" :model="form">
                    <el-form-item v-for="element in form.elementList" :key="element.index">
                        <div slot="label">
                            <p class="sft-review-title">{{ element.base.name }}</p>
                            <p class="sft-review-desc" v-if="element.base.desc">{{ element.base.desc }}</p>
                        </div>
                        <template v-if="element.base.type === 'input'">
                            <template v-if="element.base.element === 'dateTime_date'" >
                                <el-date-picker v-if="element.property.dateTypeNumber === 'dateTime'" type="datetime" v-model="element.value" size="medium">
                                </el-date-picker>
                            </template>
                            <el-input v-if="element.base.element === 'text'" v-model="element.value"></el-input>
                        </template>
                        <template v-if="element.base.type === 'radio'">
                            <el-radio-group v-model="element.property.selectContent.value">
                                <el-radio v-for="select in element.property.selectContent.data" :label="select.desc"
                                          :key="select.value" :value="select.value"></el-radio>
                            </el-radio-group>
                        </template>
                        <template v-if="element.base.type === 'select'">
                            <el-select :value="element.property.selects.value"
                                       label="{{" v-model="element.property.selects.value">
                                <el-option v-for="select in element.property.selects.data" :label="select.desc"
                                           :value="select.value" :key="select.value"></el-option>
                            </el-select>
                        </template>
                        <template v-if="element.base.type === 'multiSelect'">
                            <MultiLevelSelect :data="element.property.oneSelects"></MultiLevelSelect>
                        </template>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <el-button type="info">提交</el-button>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import inputIcon from '../../components/element/inputIcon';
    import MultiLevelSelect from '../../components/element/MultiLevelSelect';

    export default {
        name: 'review',
        data () {
            return {
                form: {},
                isLoading: true
            }
        },
        components: {
            inputIcon,
            MultiLevelSelect
        },
        computed: {
            twoLevel() {
            	return {}
            }
        },
        created() {
            let self = this;
            this.form = JSON.parse(window.localStorage.getItem('formData'));
            self.isLoading = false;
            /*for( let index =0, len = this.form.elementList.length; index < len; index++){
            	let currentItem = this.form.elementList[index];
            	if( currentItem.base.type === 'multiSelect'){
            		this.elementMap[currentItem.uuid] = currentItem;
                }
            }*/
            /*this.$http.get('http://www.easy-mock.com/mock/5961e71e9adc231f357c229e/example/form/12')
             .then(function (res) {
             self.form = res.data.data;
             self.isLoading = false;
             });*/
        },
        methods: {
            changHandle() {
            	console.log(arguments)
            }

        }
    }
</script>

<style lang="scss">
    @import '../../style/var';

    .review {
        height: 100%;
        background-color: #f9f9f9;
    }

    .review-in {
        min-height: 400px;
        margin: 0 auto;
        background: #ffffff;
    }

    .review-form header {
        background: $default;
        text-align: center;

        h1 {
            line-height: 60px;
            font-size: $f-size-max;
            font-weight: bold;
            color: $text-water;
        }
    }

    .sft-review-title {
        font-size: $f-size-title;
    }

    .sft-review-desc {
        color: #999;
    }

    .el-footer {
        background-color: $border-4;
        line-height: 60px;
        text-align: center;
    }

    .el-main {
    }

    .el-form {
        text-align: left;
    }

    .el-form-item__content {
        text-align: left;
    }

    .el-radio + .el-radio ,
    .el-select + .el-select{
        margin-left: 10px;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    @media (min-width: 768px) {

    }

    /* 中等屏幕（桌面显示器，大于等于 992px） */
    @media (min-width: 992px) {
        .review-in {
            width: 820px;
        }
    }

    /* 大屏幕（大桌面显示器，大于等于 1200px） */
    @media (min-width: 1200px) {

    }
</style>
