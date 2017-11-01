<template>
    <div id="review" class="review">
        <el-container class="review-in review-form" v-loading="isLoading">
            <el-header><h1>{{ form.formName }}</h1></el-header>
            <el-main>
                <el-form ref="form" label-width="100%" label-position="top" size="small" :model="form" >
                    <el-form-item v-for="element in form.elementList" :key="element.index">
                        <div slot="label">
                            <p class="sft-review-title">{{ element.base.title }}</p>
                            <p class="sft-review-desc" v-if="element.base.desc">{{ element.base.desc }}</p>
                        </div>
                        <div class="in" v-if="element.type === 'input'">
                            <el-input v-model="element.value"></el-input>
                        </div>
                        <div class="in" v-if="element.type === 'radio'">
                            <el-radio-group  v-model="element.selects.value">
                                <el-radio v-for="select in element.selects.data" :label="select.desc"
                                          :key="select.value"  :value="select.value"></el-radio>
                            </el-radio-group>
                        </div>
                        <div class="in" v-if="element.type === 'select'">
                            <el-select :value="element.selects.value"
                                       label="{{" v-model="element.selects.value">
                                <el-option v-for="select in element.selects.data"  :label="select.desc"
                                           :value="select.value" :key="select.value" ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer><el-button type="info">提交</el-button></el-footer>
        </el-container>
    </div>
</template>

<script>
	export default {
		name: 'review',
		data () {
			return {
                form: {},
                isLoading: true
            }
		},
        created() {
            let self = this;
            this.$http.get('http://www.easy-mock.com/mock/5961e71e9adc231f357c229e/example/form/12')
                .then(function (res) {
                    self.form = res.data.data;
                    self.isLoading = false;
                });
        }
	}
</script>

<style lang="scss">
    @import '../../style/var';
    .review{
        height: 100%;
        background-color: #f9f9f9;
        overflow: hidden;
    }
    .review-in{
        min-height: 400px;
        margin: 20px auto 0;
        background: #ffffff;
    }
    .review-form header{
        background: $default;
        text-align: center;

        h1{
            line-height: 60px;
            font-size: $f-size-max;
            font-weight: bold;
            color: $text-water;
        }
    }
    .sft-review-title{
        font-size: $f-size-title;
    }
    .sft-review-desc{
        color: #999;
    }
    .el-footer{
        background-color: $border-4;
        line-height: 60px;
        text-align: center;
    }
    .el-main{
    }
    .el-form{
        text-align: left;
    }
    .el-form-item__content{
        text-align: left;
    }
    .el-radio+.el-radio{
        margin-left: 10px;
    }


    @media (min-width: 768px) {

    }
    /* 中等屏幕（桌面显示器，大于等于 992px） */
    @media (min-width: 992px) {
        .review-in{
            width: 820px;
        }
    }
    /* 大屏幕（大桌面显示器，大于等于 1200px） */
    @media (min-width: 1200px) {

    }
</style>
