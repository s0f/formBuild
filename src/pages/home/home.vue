<template>
    <div class="sft-main">
        <headTo></headTo>
        <section class="clearfix flex sft-contain">
            <homeBar></homeBar>
            <section class="sft-content shadow">
                <h2 class="sft-content-title">新的表单</h2>
                <section class="sft-form" @click="toggleActive">
                    <component v-for="(element ,index) in elementList" :key="index" :is="element.element"
                         :data-type="element.element" :data-ref="index"
                         :class="[index== activeRef ? 'clicked' : '', 'drag-item']" v-if="element" @deleteHandle="deleteElement">
                    </component>
                    <div class="sft-flag" ref="flag"><strong>放在这里</strong></div>
                </section>
                <footer class="sft-content-footer">
                    <button class="btn btn-mini btn-primary">提交</button>
                </footer>
            </section>
            <homeSetting></homeSetting>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import store from '../../store/index'
    import headTo from '../../components/header/header'
    import homeBar from '../../pages/home/homeBar'
    import homeSetting from '../../pages/home/homeSetting'
    import Einput from '../../components/element/Einput'
    import Eradio from '../../components/element/Eradio'
    import dropDrag from '../../plugins/dropDrag/main.js'
    import $ from '../../common/query'

    export default {
        name: 'Home',
        data() {
            return {}
        },
        store,
        components: {
            headTo,
            homeBar,
            homeSetting,
            Einput,
            Eradio,
        },
        computed: {
            ...mapState({
                activeRef: state => state.activeComponentRef,
                elementList: state => state.elementList
            })
        },
        mounted () {
            const self = this;
            const dragItem = new dropDrag.Drag('.sft-left', {
                data: '',
            });
            const dropItem = new dropDrag.Drop('.sft-form', {
                innerDrag: true,
                innerDrop: true,
                ignoreSelf: true,
                onDragStart(params) {
                },
                onDragEnter(params) {
                },
                onDragMove() {
                },
                onDragLeave(params) {
                    self.$refs.flag.style.display = 'none';
                },
                onDrop(params) {
                    const componentName = params.sourceEl.getAttribute('data-type');

                    if (componentName) {
                        self.$store.commit('addElement', {
                            index: params.index,
                            componentName: componentName,
                            insert: -1
                        });
                        self.$nextTick(function () {
                            const dropDom = document.querySelector('[data-ref="' + params.index + '"]');
                            dropItem.innerDrag.add(dropDom);
                            dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                        });
                    }
                },
                onDragEnd(params) {
                },
                onInnerDrag(params) {
                    params.target.appendChild(self.$refs.flag)
                    params.target.querySelector('.sft-flag').style.display = 'block';
                },
                onInnerDragLeave(params) {
                    self.$refs.flag.style.display = 'none';
                },
                onInnerDrop(params) {
                    /*
                    * 两种插入方式
                    * 1. 从工具栏拉入
                    *    a. 找出要插入的位置
                    *    b. commit addElement 事件
                    *    c. 在innerDrag 的pos位置添加元素
                    * 2. 表单区拖放
                    *    a. 拖动元素DOM插入到目标元素后面
                    *    b.
                    * */
                    let inner = params.sourceEl.getAttribute('data-ref'),
                        pos = -1,
                        componentName = '';
                    if (!!inner) {
                        pos = this.innerDrag.find(params.target);
                        let splicePos = this.innerDrag.find(params.sourceEl);
                        componentName = params.sourceEl.getAttribute('data-type');
                        self.$store.commit('addElement', {
                            index: pos,
                            componentName: componentName,
                            insert: pos,
                            splice: splicePos
                        });
                        self.$nextTick(function () {
                            dropItem.innerDrag.clear();
                            dropItem.innerDrag.addList(document.querySelectorAll('.sft-form .drag-item'));
                            dropItem.initInnerTargetPosition();
                        });

                    } else {
                        pos = this.innerDrag.find(params.target);
                        componentName = params.sourceEl.getAttribute('data-type');
                        self.$store.commit('addElement', {
                            index: pos,
                            componentName: componentName,
                            insert: pos
                        });

                        self.$nextTick(function () {
                            let newElement = document.querySelector('[data-ref="'+ (params.index-1) +'"]');
                            dropItem.innerDrag.clear();
                            dropItem.innerDrag.addList(document.querySelectorAll('.sft-form .drag-item'));
                            dropItem.initInnerTargetPosition();
                        });
                    }
                    self.$refs.flag.style.display = 'none';
                }
            });
            const dragItem2 = new dropDrag.Drag('.sft-form', {
                data: 'inner',
                inner: true
            })
        },
        methods: {
            toggleActive (event) {
                let target = event.target;
                target = target.classList.contains('sft-element') ? target : target.parentElement;
                if( target.classList.contains('sft-element') ) {
                    const ref = target.getAttribute('data-ref'),
                        name = target.getAttribute('data-type').split(this.$store.state.elementPrefix)[1];
                    this.$store.commit('toggleActiveComponentRef', {ref: Number.parseInt(ref), name: name});
                }
            },
            deleteElement (type) {
                console.log(type)
            }

        }
    }
</script>

<style scoped lang="scss">
    @import '../../style/common';

    .shadow {
        box-shadow: rgba(0, 0, 0, .2) 0 0 5px 2px;
    }

    .sft-main {
    }

    .sft-flag {
        display: none;
        position: relative;
        height: 40px;
        line-height: 40px;
        background-color: #f1f1f1;
        color: #999;

        strong {
            position: absolute;
            left: 50%;
            z-index: 2;
            margin-left: -40px;
            background-color: #f1f1f1;
            display: block;
            width: 80px;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 0;
            margin-top: -1px;
            width: 100%;
            height: 0;
            border-bottom: 2px dashed #dddddd;
        }
    }

    .sft-contain {
        position: relative;
        width: 1500px;
        margin: 40px auto 0;
    }

    .sft-left {
        position: absolute;
        top: 0;
        left: 0;
        width: 245px;
    }

    .sft-left_item {
        margin-bottom: 40px;
    }

    .sft-content {
        position: absolute;
        top: 0;
        left: 365px;
        width: 800px;
    }

    .sft-content-title {
        height: 46px;
        background-color: #efefef;
        line-height: 46px;
        font-size: 20px;
        color: #606060;
    }

    .sft-content-footer {
        height: 46px;
        background: #efefef;
        line-height: 46px;
    }

    .sft-form {
        padding: 20px 0;
        min-height: 400px;
        user-select: none;
        cursor: pointer;
    }
</style>
