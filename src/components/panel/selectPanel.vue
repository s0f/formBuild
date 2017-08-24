<template>
    <panel title="下拉">
        <div class="stf-field-item"  slot="header">

        </div>

        <div slot="content">
            <p class="stf-field-title">选项内容</p>
            <ul>
                <li class="sft-select-item"
                    v-for="(item, index) in $store.state.elementList[$store.state.activeComponentRef].selects" :data-index="index">
                    <i class="icon icon-dagou"></i><input v-model="item.desc" class="sft-field-input"/>
                </li>
            </ul>
        </div>
    </panel>
</template>
<script>
    import store from '../../store';

    export default {
        name: "selectPanel",
        store,
        data() {
            return {}
        },
        computed: {
            selectType: {
                get: function () {
                    if (this.$store.state.activeComponentRef != -1) {
                        return this.$store.state.elementList[this.$store.state.activeComponentRef].base.value;
                    }
                    else {
                        return '';
                    }
                },
                set: function (value) {
                    this.$store.state.elementList[this.$store.state.activeComponentRef].base.value = value;
                }
            }
        }
    }
</script>
<style lang="scss">
    .sft-select-item{
        margin-bottom: 4px;

        .icon-dagou{
            margin-right: 6px;
            color: #ddd;
            cursor: pointer;
        }
    }

</style>
