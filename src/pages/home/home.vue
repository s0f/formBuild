<template>
    <div class="sft-main">
        <headTo></headTo>
        <section class="clearfix flex sft-contain" ref="contain">
            <homeBar v-on:widgetClickHandle="addElement" ref="buildLeft"></homeBar>
            <section class="sft-content shadow" ref="buildCenter">
                <h2 class="sft-content-title">新的表单</h2>
                <section class="sft-form" @click="toggleActive">
                    <component v-for="(element ,index) in elementList" :key="index" :is="element.element"
                               :data-type="element.element" :data-ref="element.index" :data-idx="index" :idx="index"
                               :class="[$store.getters.clickedRef == element.index ? 'clicked' : '','drag-item']" v-if="element">
                    </component>
                    <div class="sft-flag" ref="flag"><strong>放在这里</strong></div>
                </section>
                <footer class="sft-content-footer">
                    <button class="btn btn-mini btn-primary" @click="submitHandle">提交</button>
                </footer>
            </section>
            <homeSetting ref="buildRight"></homeSetting>
        </section>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    import store from '../../store/index'
    import headTo from '../../components/header/header'
    import homeBar from '../../pages/home/homeBar'
    import homeSetting from '../../pages/home/homeSetting'
    import Einput from '../../components/element/Input'
    import Eradio from '../../components/element/Radio'
    import Eselect from '../../components/element/Select'
    import dropDrag from '../../plugins/dropDrag/main.js'
    import $ from '../../common/query'
    import utils from '../../common/utils'

    let dragItem, dragItem2, dropItem;
    let oldWindowWidth = window.innerWidth;
    document.addEventListener('selectstart', (event) => {
        event.preventDefault();
        event.stopPropagation();

        return false;
    });
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
            Eselect
        },
        computed: {
            ...mapState({
                elementList: state => state.elementList
            })
        },
        mounted() {
            const self = this;
            dragItem = new dropDrag.Drag('.sft-left', {
                data: '',
            });
            dropItem = new dropDrag.Drop('.sft-form', {
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
                            uuid: utils.uuid(),
                            index: params.index,
                            componentName: componentName,
                            insert: -1
                        });
                        self.$nextTick(function () {
                            const dropDom = document.querySelector('[data-idx="' + params.index + '"]');
                            dropItem.innerDrag.add(dropDom);
                            dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                        });
                    }
                },
                onDragEnd(params) {
                    self.$refs.flag.style.display = 'none';
                },
                onInnerDrag(params) {
                    params.target.appendChild(self.$refs.flag)
                    params.target.querySelector('.sft-flag').style.display = 'block';
                },
                onInnerDragLeave(params) {
                    self.$refs.flag.style.display = 'none';
                    console.log('onInnerDragLeave')
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
                    let inner = params.sourceEl.getAttribute('data-idx'),
                        pos = -1,
                        componentName = '';
                    if (!!inner) {
                        pos = this.innerDrag.find(params.target);
                        let splicePos = this.innerDrag.find(params.sourceEl);
                        componentName = params.sourceEl.getAttribute('data-type');
                        self.$store.commit('addElement', {
                            uuid: utils.uuid(),
                            index: pos,
                            componentName: componentName,
                            insert: pos,
                            splice: splicePos
                        });
                        self.$nextTick(function () {
                            dropItem.innerDrag.clear();
                            dropItem.innerDrag.addList(document.querySelectorAll('.sft-form .drag-item'));
                            dropItem.initInnerTargetPosition();
                            self.getClickedRefForActiveRef();
                        });
                        

                    } else {
                        pos = this.innerDrag.find(params.target);
                        componentName = params.sourceEl.getAttribute('data-type');
                        self.$store.commit('addElement', {
                            uuid: utils.uuid(),
                            index: pos,
                            componentName: componentName,
                            insert: pos
                        });

                        self.$nextTick(function () {
                            let newElement = document.querySelector('[data-idx="' + (params.index - 1) + '"]');
                            dropItem.innerDrag.clear();
                            dropItem.innerDrag.addList(document.querySelectorAll('.sft-form .drag-item'));
                            dropItem.initInnerTargetPosition();
                            self.getClickedRefForActiveRef();
                        });
                    }
                    self.$refs.flag.style.display = 'none';
                }
            });
            dragItem2 = new dropDrag.Drag('.sft-form', {
                data: 'inner',
                inner: true
            });

            // 页面自适应
            this.resize();
            window.addEventListener('resize', this.resizeHandle);
            this.$store.dispatch('recovery');
        },
        methods: {
            addElement(target) {
                const componentName = target.getAttribute('data-type')
                this.$store.commit('addElement', {
                    componentName: componentName,
                    uuid: utils.uuid(),
                    insert: -1
                });
                this.$nextTick(function () {
                    const colletion = document.querySelectorAll('.sft-form .sft-element');
                    const dropDom = colletion[colletion.length - 1];
                    dropItem.innerDrag.add(dropDom);
                    dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                });
            },
            getClickedRefForActiveRef() {
                let item = document.querySelector('[data-ref="'+ this.$store.clickedComponentRef+'"]');
                if (item) {
                    return item.getAttribute('data-idx');
                } else {
                    return -1;
                }
            },
            toggleActive(event) {
                let target = event.target;
                target = target.classList.contains('sft-element') ? target : target.parentElement;
                if (target.classList.contains('sft-element')) {
                    const index = target.getAttribute('data-idx'),
                        targetIndex = target.getAttribute('data-ref'),
                        name = target.getAttribute('data-type').split(this.$store.state.elementPrefix)[1];

                    this.$store.commit('toggleClickedComponentRef', {
                        ref: Number.parseInt(index),
                        name: name
                    });
                    this.$store.commit('toggleActiveComponentRef', {
                        ref: Number.parseInt(index),
                        name: name
                    });
                }
            },
            submitHandle(event) {
                var submitBtn = event.target;
                // submitBtn.setAttribute('disabled', true);
                console.log(JSON.stringify(this.$store.state.elementList))
            },
            resize() {
                // TODO 页面自适应
                let winWidth = document.documentElement.offsetWidth,
                    winHeight = document.documentElement.offsetHeight;
                const containMaxWidth = 1588,
                    containMiddleWidth = 1388;
                if (winWidth > 1588) {
                    this.$refs.contain.style.width = containMaxWidth + 'px';
                    this.$refs.buildLeft.$el.style.left = '70px';
                    this.$refs.buildCenter.style.left = '430px';
                    this.$refs.buildCenter.style.right = '360px';
                }
                if (winWidth > 1388 && winWidth < 1660) {
//                    oldWindowWidth = winWidth;
                    this.$refs.contain.style.width = containMiddleWidth + 'px';
                    this.$refs.buildCenter.style.left = '370px';
                    this.$refs.buildCenter.style.right = '360px';
                    this.$refs.buildLeft.$el.style.left = '40px';
                }
                if (winWidth < 1388) {
                    let oldLeft = Number.parseInt(this.$refs.buildLeft.$el.style.left);
                    this.$refs.contain.style.width = winWidth + 'px'
                    if (oldLeft >= 0) {
                        this.$refs.buildLeft.$el.style.left = oldLeft - (oldWindowWidth - winWidth ) + 'px';
                    }
                    this.$refs.buildCenter.style.left = '320px';
                    this.$refs.buildCenter.style.right = '360px';
                }
            },
            resizeHandle(event) {
                let self = this;
                setTimeout(this.resize.bind(this), 200);
            }
        }
    }
</script>

<style lang="scss">

    .shadow {
        box-shadow: rgba(0, 0, 0, .2) 0 0 5px 2px;
    }

    .sft-main, .sft-contain {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: all .2s cubic-bezier(.47, 0, .745, .715);
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
        width: 1500px;
        margin: 60px auto 0;
    }

    .sft-left {
        position: absolute;
        top: 0;
        left: 100px;
        width: 235px;
    }

    .sft-left_item {
        margin-bottom: 40px;
    }

    .sft-content {
        position: absolute;
        top: 0;
        left: 430px;
        right: 360px;
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

    .x-drag-mark {
        .drag-item {
            border: 1px solid #ddd;
        }
    }

    @media screen and (min-width: 1660px) {
        .sft-left {
            width: 336px;
        }
    }
</style>
