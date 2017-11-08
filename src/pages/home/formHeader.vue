<template>
    <div class="sft-main bg-gray">
        <section class="margin-top-xll margin-horizontal-auto sft-form-header">
            <el-row :gutter="20" justify="center">
                <el-col :span="24">
                    <h3>表头设计</h3>
                    <el-form ref="form" label-position="left" :model="form" label-width="80px">
                        <el-form-item label="标题">
                            <el-input v-model="form.formName"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="form.formDesc"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="updateAttribute">保存</el-button>
                    </el-form>
                </el-col>
            </el-row>
        </section>
        <section class="clearfix flex sft-contain" ref="contain">

            <section class="sft-content bg-white shadow" ref="buildCenter">
                <h2 class="sft-content-title">{{$store.state.formName}}</h2>
                <section class="sft-form disabled">
                    <component v-for="(element ,index) in elementList" :key="index" :is="element.element" :data-type="element.element" :data-ref="element.index" :data-idx="index" :idx="index" v-if="element" :uuid="element.uuid" disabled="true">
                    </component>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters
} from 'vuex'
import store from '../../store/index'
import Einput from '../../components/element/Input'
import Eradio from '../../components/element/Radio'
import Eselect from '../../components/element/Select'

export default {
    name: "formHeader",
    data() {
        return {
            form: {
                formName: '',
                formDesc: ''
            }
        };
    },
    store,
    components: {
        Einput,
        Eradio,
        Eselect
    },
    created() {
        let self = this;
        this.$store.commit('updateStep', {
            step: 1
        });
       /* this.$store.dispatch('recovery', {
            loadFormDataEd() { }
        });*/
        this.form.formName = this.$store.state.formName;
        this.form.formDesc = this.$store.state.formDesc;
    },
    computed: {
        ...mapState({
            elementList: state => state.elementList
        })
    },
    methods: {
        updateAttribute(attributeName) {
            this.$store.commit('updateForm', {
                formName: this.form.formName,
                formDesc: this.form.formDesc
            });
            this.$router.push({ name: 'formEdit' });
            this.$store.commit('updateStep', {
                step: 2
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/var';
.sft-form-header {
    width: 400px;
    padding: 0 20px 30px;
    background-color: #fff;
    border-radius: 4px;
    h3 {
        padding-top: 14px;
        margin-bottom: 10px;
        line-height: 40px;
        color: $active;
    }
}

.sft-contain {
    position: relative;
    width: inherit;
}
    .sft-content{
        position: relative;
        left: inherit;
        width: 820px;
        margin: 0 auto;
    }
</style>
