<template>
    <div class="widget-main" @click="widgetClickHandle">
        <h3 class="widget-title">{{baseWidgetTitle}}</h3>
        <div class="widget-content">
            <div class="widget-list clearfix">
                <div class="widget-list_item drag-item" v-for="(item, index) in baseWidgets" :data-type="'E'+item[0]"
                     :element="item[1]" :data-idx="index" v-if="item[4]">
                    <span class="icon-box">
                        <i class="icon" v-html="item[3]"></i>
                    </span>
                    <p class="widget-list_txt">{{item[2]}}</p>
                </div>
                <div class="widget-list_item not-dev" v-else>开发中...</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    props: ['baseWidgetTitle', 'baseWidgets'],
    methods: {
        widgetClickHandle(event) {
            console.log('widgetClickHandle')
            let target = event.target.classList.contains('widget-list_item') ? event.target : event.target.parentElement;
            target = target.classList.contains('widget-list_item') ? target : target.parentElement;

            if (target.classList.contains('widget-list_item') && !target.classList.contains('not-dev')) {
                this.$emit('widgetClickHandle', {
                    target: target,
                    data: this.baseWidgets[target.getAttribute('data-idx')]
                });
            }
        }
    }
}
</script>

<style lang="scss">

.widget-main {
    background-color: #fff;
    overflow: hidden;
    user-select: none;
}

.widget-title {
    margin: 16px 0 30px;
    line-height: 1;
    font-size: 17px;
    color: #858585;
}

.widget-content {
    padding: 0 10px 20px 10px;
}

.widget-list {
    border-left: 1px solid #eeeeee;
    font-size: 12px;
    color: #656565;
}

.widget-list_item {
    float: left;
    width: 62px;
    height: 62px;
    margin-bottom: -1px;
    border-top: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;

    &:hover {
        background: #ededed;
        box-shadow: 0 0 0 1px #333 inset;
        color: #000;
    }
    .icon {
        font-size: 24px;
        vertical-align: middle;
    }
}

.widget-list_txt {
    line-height: 20px;
}

.icon-box {
    display: block;
    padding-top: 12px;
}
    .not-dev{
        line-height: 62px;
    }
</style>
