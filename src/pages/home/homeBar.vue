<template>
    <section class="sft-left">
        <section class="sft-left_item shadow">
            <Widget :baseWidgetTitle="baseWidgetTitle" :baseWidgets="baseWidgets"></Widget>
            <Widget :baseWidgetTitle="picWidgetTitle" :baseWidgets="picWidgets"></Widget>
            <Widget :baseWidgetTitle="auxiliaryTitle" :baseWidgets="auxiliarys"></Widget>
        </section>
        <section class="sft-left_item shadow">
            <Widget :baseWidgetTitle="contactsTitle" :baseWidgets="contacts"></Widget>
            <Widget :baseWidgetTitle="imTitle" :baseWidgets="ims"></Widget>
        </section>
    </section>
</template>
<script>

import Widget from '../../components/widget/baseWidget'
export default {
    name: 'homeBar',
    data() {
        return {
            baseWidgetTitle: '基础组件',
            baseWidgets: [
                ['input', '文本框', '&#xe600;'],
                ['radio', '选择', '&#xe627;&#xe6dc;'],
                ['select', '下拉', '&#xe6dc;'],
                ['select-multiple', '多行下拉', '&#xe6dc;&#xe6dc;'],
                ['date', '日期', '&#xe604;'],
                ['table', '表格', '&#xe661;'],
                ['number', '数字', '&#xe60b;'],
                ['score', '评分', '&#xe623;'],
                ['sort', '排序', '&#xe654;'],
                ['currency', '货币', '&#xe6af;'],
                ['enclosure', '附件', '&#xe652;'],
                ['commodity', '商品', '&#xe616;'],
                ['city', '城市', '&#xe649;'],
            ],
            picWidgetTitle: '图片类组件',
            picWidgets: [
                ['pic-upload', '图片上传', '&#xe698;'],
                ['pic-select', '图片选择', ' &#xe6d3;'],
                ['pic-show', '图片展示', '&#xe601;'],
            ],
            auxiliaryTitle: '辅助类组件',
            auxiliarys: [
                ['text-multiple', '文本描述', '&#xe7e1;'],
                ['line', '分割线', '&#xe634;'],
                ['paging', '分页', '&#xe609;'],
            ],
            contactsTitle: '联系人组件',
            contacts: [
                ['contact', '联系人', '&#xe606;'],
                ['phone', '手机', '&#xe611;'],
                ['email', '邮箱', '&#xe659;'],
                ['company', '公司', '&#xe63f;'],
                ['job', '职位', '&#xe678;'],
                ['department', '部门', '&#xe61f;'],
                ['portrait', '头像', '&#xe62f;'],
                ['telephone', '电话', '&#xe647;'],
                ['area', '地址', '&#xe624;'],
                ['birthday', '生日', '&#xe63a;'],
                ['link', '链接', '&#xe6d4;'],
                ['location', '所在地', '&#xe639;'],
            ],
            imTitle: '即时通讯',
            ims: [
                ['weixin', '微信', '&#xe78a;'],
                ['qq', 'QQ', '&#xe617;'],
                ['weibo', '微博', '&#xe603;'],
            ]
        }
    },
    components: {
        Widget,
    }
}
</script>
<style lang="scss" scoped>

</style>