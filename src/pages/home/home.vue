<template>
    <div class="sft-main">
        <section class="clearfix flex sft-contain" ref="contain">
            <homeBar v-on:widgetClickHandle="addElement" ref="buildLeft"></homeBar>
            <section class="sft-content shadow" ref="buildCenter">
                <h2 class="sft-content-title">{{formName}}</h2>
                <section class="sft-form" @click="toggleActive">
                    <component v-for="(element ,index) in elementList" :key="index" :is="element.element" :data-type="element.element" :data-ref="element.index" :data-idx="index" :idx="index" :class="[$store.state.activeComponentUUID == element.uuid ? 'clicked' : '','drag-item']" v-if="element" :uuid="element.uuid">
                    </component>
                    <div class="sft-flag" ref="flag">
                        <strong>放在这里</strong>
                    </div>
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
        homeBar,
        homeSetting,
        Einput,
        Eradio,
        Eselect
    },
    computed: {
        ...mapState({
            elementList: state => state.elementList,
            formName: state => state.formName
        })
    },
    created() {
        let self = this;
        this.$store.commit('updateStep', {
            step: 2
        });

        this.$store.dispatch('recovery', {
            loadFormDataEd() {
                self.$nextTick(function() {
                    let list = document.querySelectorAll('.sft-element');
                    dropItem.innerDrag.addList(list);
                });
                self.$http.get('http://easy-mock.com/mock/5961e71e9adc231f357c229e/example/dragSate')
                    .then(function(res) {
                        dropItem.innerDragPosition.addList(res.data.data);
                    });
            }
        });

    },
    mounted() {
        const self = this;
        // 页面自适应
        this.resize();
        window.addEventListener('resize', this.resizeHandle);

        dragItem = new dropDrag.Drag('.sft-left', {
            data: '',
        });
        dropItem = new dropDrag.Drop('.sft-form', {
            innerDrag: true,
            innerDrop: true,
            ignoreSelf: true,
            onDragStart(params) { },
            onDragEnter(params) { },
            onDragMove() {
                console.log('x')
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
                    self.$nextTick(function() {
                        const dropDom = document.querySelector('[data-idx="' + params.index + '"]');
                        dropItem.innerDrag.add(dropDom);
                        dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
                    });
                }
                params.target.querySelector('.sft-flag').style.display = 'block';
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
                    self.$nextTick(function() {
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

                    self.$nextTick(function() {
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

    },
    methods: {
        addElement(target) {
            const componentName = target.getAttribute('data-type')
            this.$store.commit('addElement', {
                componentName: componentName,
                uuid: utils.uuid(),
                insert: -1
            });
            this.$nextTick(function() {
                const colletion = document.querySelectorAll('.sft-form .sft-element');
                const dropDom = colletion[colletion.length - 1];
                dropItem.innerDrag.add(dropDom);
                dropItem.innerDragPosition.add(dropDom.getBoundingClientRect());
            });
        },
        getClickedRefForActiveRef() {
            /*
            更新 当前选择元素Ref，指向正确位置
             */
            let item = document.querySelector('[uuid="' + this.$store.state.activeComponentUUID + '"]');
            if (item) {
                this.$store.commit('toggleActiveComponent', {
                    ref: item.getAttribute('data-idx')
                });
                // return state.elementList[Number.parseInt(item.getAttribute('data-idx'))];
            } else {
                return null;
            }
        },
        toggleActive(event) {
            /*
                点击时元素A，元素为选中状态，记住ID
                拖拽其他元素后，列表重新render，A 依然要处于选中状态
             */
            let target = event.target;
            target = target.classList.contains('sft-element') ? target : target.parentElement;
            if (target.classList.contains('sft-element')) {
                const index = target.getAttribute('data-idx'),
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
            // submitBtn.setAttribute('disabled', true);
            console.log(JSON.stringify(this.$store.state))
            let dropState = dropItem.innerDragPosition.toString().map((item) => {
                let tempObj = {};
                for (let key in item) {
                    tempObj[key] = item[key];
                }
                return tempObj;
            });
            console.log(JSON.stringify(dropState))
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
                    this.$refs.buildLeft.$el.style.left = oldLeft - (oldWindowWidth - winWidth) + 'px';
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

<style lang="scss" scoped>
.sft-contain {
    background-color: #fff;
}
</style>
