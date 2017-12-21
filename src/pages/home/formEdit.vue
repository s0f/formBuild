<template>
    <div class="sft-main sft-form-build">
        <section class="clearfix flex sft-contain" ref="contain">
            <homeBar v-on:widgetClickHandle="addElement" ref="buildLeft"></homeBar>
            <section class="sft-content" ref="buildCenter">
                <div class="sft-form-wrap">
                    <h2 class="sft-content-title">{{formName}}</h2>
                    <div class="sft-content-body">
                        <section class="sft-form" @click="toggleActive" ref="buildForm">
                            <component v-for="(element ,index) in elementList" :key="index" :is="'E'+element.base.type" :data-type="$store.state.elementPrefix+element.base.type"
                                :data-ref="element.index" :data="element" :data-index="index" :data-element="element.base.element" :class="[$store.state.activeComponentUUID === element.uuid ? 'clicked' : '','drag-item']"
                                v-if="element" :uuid="element.uuid">
                            </component>
                            <div class="sft-flag" ref="flag">
                                <strong>放在这里</strong>
                            </div>
                        </section>
                        <footer class="sft-content-footer">
                            <el-button type="primary" @click="submitHandle">提交</el-button>
                        </footer>
                        <div class="sft-author">由SSF提供技术支持</div>
                    </div>
                </div>
            </section>
            <homeSetting ref="buildRight"></homeSetting>
        </section>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import store from '../../store/index'
    import homeBar from '../../pages/home/homeBar'
    import homeSetting from '../../pages/home/homeSetting'
    import Einput from '../../components/element/Input'
    import Eradio from '../../components/element/Radio'
    import Eselect from '../../components/element/Select'
    import EmultiSelect from '../../components/element/multiSelect'
    import Etable from '../../components/element/Table'
    import Esort from '../../components/element/Sort'
    import Ecommodity from '../../components/element/Commodity'
    import Ecity from '../../components/element/City'
    import * as dropDrag from '../../plugins/dropDrag/main.js'
    import $ from '../../common/query'
    import utils from '../../common/utils'
    import PerfectScrollbar  from 'perfect-scrollbar'
    import 'perfect-scrollbar/css/perfect-scrollbar.css'
    let dragItem, dragItem2, dropItem;
    let oldWindowWidth = window.innerWidth;
    document.addEventListener('selectstart', (event) => {
        event.preventDefault();
        event.stopPropagation();

        return false;
    });
    export default {
        name: 'formEdit',
        data() {
            return {}
        },
        store,
        components: {
            homeBar,
            homeSetting,
            Einput,
            Eradio,
            Eselect,
            EmultiSelect,
            Etable,
            Esort,
            Ecommodity,
            Ecity,
        },
        computed: {
            ...mapState({
                elementList: state => state.elementList,
                formName: state => state.formName
            })
        },
        created() {
            let self = this,
                scrollbar;
            //            this.$loading();
            this.$store.commit('updateStep', {
                step: 2
            });
             self.$nextTick(function () {
                scrollbar = new PerfectScrollbar(this.$refs.buildCenter, {
                    whellSpeed: 2
                });
             });
            /*this.$store.dispatch('recovery', {
             loadFormDataEd() {
             self.$nextTick(function () {
             let list = document.querySelectorAll('.sft-form-build .sft-element');
             dropItem.innerDrag.addList(list);
             console.log(list)
             });
             self.$http.get('http://easy-mock.com/mock/5961e71e9adc231f357c229e/example/dragSate')
             .then(function (res) {
             dropItem.innerDragPosition.addList(res.data.data);
             setTimeout(function () {
             //                                self.$loading().close()
             }, 200)
             });
             }
             });*/

        },
        mounted() {
            const self = this;
            // 页面自适应
            setTimeout(function(){
                self.resize();
            }, 1000)
            window.addEventListener('resize', this.resizeHandle);

            dragItem = new dropDrag.Drag('.sft-left', {
                data: '',
            });
            dropItem = new dropDrag.Drop('.sft-form', {
                innerDrag: true,
                innerDrop: true,
                ignoreSelf: true,
                onDragStart(params) {
                    setTimeout(function () {
                        document.querySelector('.x-drag-mark .drag-item').style.width = $.css(
                            document.querySelector('.sft-content'), 'width');
                    }, 0);
                },
                onDragEnter(params) {},
                onDragMove() {},
                onDragLeave(params) {
                    self.$refs.flag.style.display = 'none';
                },
                onDrop(params) {
                    const componentName = params.sourceEl.getAttribute('data-type'),
                        element = params.sourceEl.getAttribute('element');

                    if (componentName) {
                        self.$store.commit('addElement', {
                            uuid: utils.uuid(),
                            index: params.index,
                            element: element || '',
                            componentName: componentName,
                            insert: -1
                        });
                        self.$nextTick(function () {
                            const dropDom = document.querySelector('[data-index="' + params.index +
                                '"]');
                            dropItem.innerDrag.add(dropDom);
                            dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                        });
                    }
                    params.el.querySelector('.sft-flag').style.display = 'block';
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
                    let inner = params.sourceEl.getAttribute('data-index'),
                        pos = -1,
                        componentName = '',
                        element = '';
                    if (!!inner) {
                        pos = this.innerDrag.find(params.target);
                        let splicePos = this.innerDrag.find(params.sourceEl);
                        componentName = params.sourceEl.getAttribute('data-type');
                        element = params.sourceEl.getAttribute('element');
                        self.$store.commit('addElement', {
                            uuid: utils.uuid(),
                            index: pos,
                            componentName: componentName,
                            element: element || '',
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
                        element = params.sourceEl.getAttribute('element');
                        self.$store.commit('addElement', {
                            uuid: utils.uuid(),
                            index: pos,
                            element: element || '',
                            componentName: componentName,
                            insert: pos
                        });

                        self.$nextTick(function () {
                            let newElement = document.querySelector('[data-index="' + (params.index - 1) +
                                '"]');
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

            this.$refs.buildCenter.addEventListener('ps-scroll-y', ()=> {
                dropItem.initInnerTargetPosition();
            });
        },
        methods: {
            addElement(payload) {
                console.log('xx add e')
                this.$store.commit('addElement', {
                    componentName: this.$store.state.elementPrefix + payload.data[0],
                    element: payload.data[1] || '',
                    uuid: utils.uuid(),
                    insert: -1
                });
                this.$nextTick(function () {
                    const colletion = document.querySelectorAll('.sft-form .sft-element');
                    const dropDom = colletion[colletion.length - 1];
                    dropItem.innerDrag.add(dropDom);
                    dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                    // 如果没有激活的元素，激活添加的元素
                    if (this.$store.state.activeComponentUUID === -1) {

                        /* let eventObj = document.createEvent('MouseEvents');
                        eventObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false,
                            false,
                            false, 0, null);
                        dropDom.dispatchEvent(eventObj); */
                        utils.fire(dropDom, 'click');
                    }
                });
            },
            getClickedRefForActiveRef() {
                /*
                 更新 当前选择元素Ref，指向正确位置
                 */
                let item = document.querySelector('[uuid="' + this.$store.state.activeComponentUUID + '"]');
                if (item) {
                    this.$store.commit('toggleActiveComponent', {
                        ref: item.getAttribute('data-index')
                    });
                } else {
                    return null;
                }
            },
            toggleActive(event) {
                /*
                 点击时元素A，元素为选中状态，记住ID
                 拖拽其他元素后，列表重新render，A 依然要处于选中状态
                 */
                let target = $.parents(event.target, '.sft-element');
                if (target && target.classList.contains('sft-element')) {
                    const index = target.getAttribute('data-index'),
                        targetIndex = target.getAttribute('data-ref'),
                        name = target.getAttribute('data-type').split(this.$store.state.elementPrefix)[1],
                        uuid = target.getAttribute('uuid');

                    this.$store.commit('toggleActiveComponent', {
                        name: name,
                        uuid: uuid,
                        ref: index
                    });

                }
            },
            submitHandle(event) {
                var submitBtn = event.target;
                let dropState = dropItem.innerDragPosition.toString().map((item) => {
                    let tempObj = {};
                    for (let key in item) {
                        tempObj[key] = item[key];
                    }
                    return tempObj;
                });
                window.localStorage.setItem('formData', JSON.stringify(this.$store.state));
                location.href = location.origin + location.pathname + 'review.html';
            },
            resize() {
                // TODO 页面自适应
                let winWidth = document.documentElement.offsetWidth,
                    winHeight = window.innerHeight,
                    leftBarHeight = this.$refs.buildLeft.$el.offsetHeight;
                const containMaxWidth = winWidth - 20;
                if (winWidth > 1920) {
                    this.$refs.contain.style.width = '1880px';
                }
                if (winWidth >= 1660 && winWidth <= 1920) {
                    this.$refs.contain.style.width = containMaxWidth + 'px';
                    this.$refs.buildLeft.$el.style.left = '50px';
                    this.$refs.buildCenter.style.left = '440px';
                    this.$refs.buildCenter.style.right = '490px';
                }
                if (winWidth > 1388 && winWidth < 1659) {
                    //                    oldWindowWidth = winWidth;
                    this.$refs.contain.style.width = containMaxWidth + 'px';
                    this.$refs.buildLeft.$el.style.left = '60px';
                    this.$refs.buildCenter.style.left = '320px';
                    this.$refs.buildCenter.style.right = '360px';
                }
                if (winWidth < 1388) {
                    let oldLeft = Number.parseInt(this.$refs.buildLeft.$el.style.left || 0);
                   
                    this.$refs.contain.style.width = winWidth + 'px';
                    if (oldLeft >= 0) {
                        this.$refs.buildLeft.$el.style.left = '20px';
                    }
                    this.$refs.buildCenter.style.left = '290px';
                    this.$refs.buildCenter.style.right = '360px';
                }

                if (leftBarHeight > winHeight) {
                    this.$refs.buildLeft.$el.querySelectorAll('.sft-left_item')[1].style.display = 'none';
                }
               
                setTimeout(()=>{
                     this.$refs.buildForm.style.minHeight = (this.$refs.buildCenter.clientHeight
                     - document.querySelector('.sft-content-title').clientHeight-
                      document.querySelector('.sft-content-footer').clientHeight - 
                      document.querySelector('.sft-author').clientHeight  ) + 'px'; 
                },200)

            },
            resizeHandle(event) {
                let self = this;
                clearTimeout(this.timer);
                this.timer = setTimeout(this.resize, 200);
            }
        }
    }

</script>

<style lang="scss" scoped>
</style>
