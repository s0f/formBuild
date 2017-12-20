<template>
    <Field title="填写设置">
        <Field title="输入形式">
            <ul @click="clickHandle" ref="radioWrap">
                <li :class="['radio-content', property.type === 1?'active':'']">
                    <div class="mult-img"></div>
                    <h5 class="radio-info">多级下拉</h5>
                </li>
                <li :class="['radio-content', property.type === 1?'':'active']">
                    <div class="input-img"></div>
                    <h5 class="radio-info">输入联想</h5>
                </li>
            </ul>
        </Field>

        <selectField :title="property.minLevel.name" :property="property.minLevel" :data="['国家','省份', '城市', '区']" easy updateKey="minLevel"></selectField>
        <Field title="限定国家">
            <el-select v-model="setCountry">
                <el-option
                    v-for="item in country"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]"
                    value-key="value">
                </el-option>
            </el-select>
        </Field>
    </Field>
</template>
<script>
    import Field from './Field';
    import selectField from "./selectField";
    import $ from '../../common/query';

    export default {
        name: 'currency',
        data() {
            return {
            };
        },
        components: {
            Field,
            selectField,
        },
        computed: {
            setCountry: {
                get() {
                    return this.property.country.value
                },
                set(value) {
                    const params = {
                        type: 'country',
                        value: value
                    };
                    this.$store.commit('updateAttribute', params);
                }
            },
            country() {
                return this.$store.state.editor.country;
            },
            property() {
                return this.active.property;
            },
            active() {
                return this.$store.getters.activeComponent;
            }
        },
        created() {
            this.$store.dispatch('getAllCountry');
        },
        methods: {
            clickHandle(event) {
                let target = event.target;
                target = target.nodeName === 'LI' ? target:  target.parentElement;
                if(target) {
                    target.classList.add('active');
                    $.siblings(target, 'LI').forEach(item => {
                        item.classList.remove('active');
                    });

                    this.$store.commit('updateAttribute', {
                        easy: true,
                        type: 'type',
                        value: $.index(this.$refs.radioWrap.children, target)+1
                    });
                }
            }
        }
    };

</script>
<style lang="scss" scoped>
    @import '../../style/var.scss';

    ul {
        width: 300px;
        margin: 0 auto;
        overflow: hidden;
        li {
            float: left;
            margin-right: -1px;
            border: 1px solid #efefef;
            box-shadow: 0 0 3px #efefef;
            cursor: pointer;

            &:last-child{
                margin-left: 10px;
            }

            &:hover,
            &.active {
                border-color: $primary;
                .radio-info {
                    color: $primary;
                }
            }
        }
    }
    .mult-img,
    .input-img{
        margin: 0 auto;
        width: 136px;
        height: 60px;
        background: url(../../assets/langSprite_cn.png) no-repeat;
        background-position: 0 0;
    }
    .input-img {
        background-position: 0 -61px;
    }
    .radio-content {
        text-align: center;
    }
    .radio-info {
        line-height: 30px;
        font-size: 14px;
        color: #999;
    }

</style>
