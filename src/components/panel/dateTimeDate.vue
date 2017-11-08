<template>
    <div>
        <selectField @changeType="changeHandle"
                     :title="property['changeTimeType'].name" :property="property['changeTimeType']" updateKey="changeTimeType">
        </selectField>
        <selectField v-if="property.dateTypeNumber==='dateTime' || property.dateTypeNumber === 'date'" :property="property['changeDateFormat']"  size="small" updateKey="changeDateFormat" :show="showItems" title="接受的日期格式" @change="changeDateFormat"></selectField>

        <selectField :property="property['defaultShowTime']" updateKey="defaultShowTime" size="small" :show="defaultShow" @changeType="defaultTimeHandle"
                     ref="defaultTime"></selectField>
        <Field>
            <el-date-picker
                v-if="property.isCustomDefaultTime"
                v-model="customDefaultTime"
                align="right"
                type="date"
                size="small"
                placeholder="选择日期">
            </el-date-picker>
        </Field>

        <selectField v-if="property.dateTypeNumber!==2"  :property="property['accurateTimeData']" updateKey="accurateTimeData"
                     size="small"></selectField>

        <!--      <selectField v-if="active.base.dateTypes" type="base" @change="changeHandle"
                           :title="active.base.dateTypesName" :attr="active.base">
              </selectField>
              <Field v-if="dateTypeNumber<3">
                  <checkboxField v-if="active.base.dateTypes" :attr="active.base.dateTypes" :show="showItems"></checkboxField>
              </Field>
              <selectField v-else type="base"
                           title="时间精确到" :attr="timeData">
              </selectField>
              <selectField title="默认显示日期时间" type="base" :attr="defaultShowTime" :show="defaultShow" @change="defaultTimeHandle" size="small" ref="defaultTime"></selectField>
              <el-date-picker
                  v-if="isCustomDefaultTime"
                  v-model="customDefaultTime"
                  align="right"
                  type="date"
                  size="small"
                  placeholder="选择日期">
              </el-date-picker>-->
    </div>
</template>

<script>
    import Field from './Field';
    import selectField from './selectField';
    import checkboxField from './checkboxField';
    import utils from '../../common/utils';

    export default {
        name: 'dateTimeDate',
        data () {
            return {
                customDefaultTime: ''
            }
        },
        props: ['activeComponent'],
        computed: {
            property() {
            	return this.activeComponent.property;
            },
            showItems() {
        		return this.property.types[this.property.dateTypeNumber];
            },
            defaultShow() {
            	return this.property.defaultItems[this.property.dateTypeNumber];
            }
        },
        components: {
            Field,
            selectField,
            checkboxField
        },
        methods: {
            defaultTimeHandle(payload) {
            	this.property.isCustomDefaultTime = payload.value === 3 || payload.value === 4;
            },
            changeHandle(payload){

            	this.property.isCustomDefaultTime = false;
            	this.property.dateTypeNumber = payload.value;
                this.$refs.defaultTime&&this.$refs.defaultTime.$emit('reset', 1);
            },
            changeDateFormat(payload) {
                this.$store.commit('updateAttribute', {
                    type: 'changeDateFormat',
                    value: payload.value
                });
            }
        }
    }
</script>

<style scoped>

</style>
