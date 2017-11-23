import util from './utils/index'
import dragDropBase from './dragDropBase'
import store from './store'
import List from './plugins/List'

/*
    options:
    innerDrop 目的地内元素可以拖动（上下）
    对象属性
    innerDrag 存放目的地内元素

    事件流程：
        start -> move -> inner -> leave
        start -> move -> inner -> leave -> mover -> inner
*/

// TODO 拖拽元素放下时，快速的点击，会出现bug
class Drop extends dragDropBase {
    /**
     * @param  {Element} el
     * @param  {Object} options {data: '', onDragStart: function (params) {}, onDragEnter: function (params) {},onDragOver:fn,onDragLeave:fn,onDrop:fn,onDragEnd:fn}
     * new Drag('.item', options)
     */
    constructor(el, options) {
        super();

        let defaultOptions = {
            innerDrag: false,
            innerDrop: false,
            ignoreSelf: false, // 启动innerDrop时，当前拖动对象忽略自己的位置
        }

        this.el = util.$(el);
        this.options = util.checkOptions(options);
        this.isInitOk = false;
        this.innerDragPosition = new List();
        this.innerDrag = new List();
        this.innerDragIng = false;
        this.currentInnerPosIndex = -1; // 当前拖动对象所处的位置
        this.index = -1;
        this.isEnter = false;
        this.currentInnerIndex = -1; // 当前拖动对象的index
        if (!this.options) {
            return false;
        }
        this.init();
    }
    init() {
        this.listen();
        this.isInitOk = true;
        if (this.options.innerDrop) {
            this.initInnerDrop();
        }
    }
    initPosition() {
        let pos = this.el.getBoundingClientRect();
        if (this.isInitOk) {
            store.targetPosition[this.posIndex] = pos;
        } else {
            this.posIndex = store.targetPosition.length;
            store.targetPosition.push(pos);
        }
    }

    initInnerDrop() {
    }

    initInnerTargetPosition() {
        let i = 0,
            len = this.innerDrag.size;

        this.innerDragPosition.clear();

        this.innerDrag.front();

        for (; i < len; i++) {
            this.innerDragPosition.add(this.innerDrag.getElement().getBoundingClientRect());
            this.innerDrag.next();
        }
    }

    listen() {
        let index = store.targets.push({
            el: this.el,
            name: this.options.name,
            isEnter: false
        });
        this.initPosition();
        index -= 1;
        this.index = index;

        store.dropIndex = index;
        store.dragStartHandleList[index] = this.onDragStart.bind(this);
        store.dragMoverHandleList[index] = this.onDragMove.bind(this);
        store.dragEnterHandleList[index] = this.onDragEnter.bind(this);
        store.dragLeaveHandleList[index] = this.onDragLeave.bind(this);
        store.dropHandleList[index] = this.onDrop.bind(this);
        store.dragEndHandleList[index] = this.onDragEnd.bind(this);
    }
    onDragStart(params) {
        let dataRef =  this.innerDrag.find(params.sourceEl);//Number.parseInt(params.sourceEl.getAttribute('data-ref'));
        this.currentInnerIndex = dataRef !== -1 ? dataRef : -1;
        this.emit('onDragStart', params);
    }
    onDragEnter(params) {
        this.emit('onDragEnter', params);
    }
    onDragMove(params) {
        let index = this.collision(params.pos);
        if (index !== -1) {

            if (this.options.innerDrag && this.innerDrag.size) {
                // 离开上一个马上进入下一个
                if (this.currentInnerPosIndex !== -1) {
                    // 忽略自己

                    if (this.options.ignoreSelf && (  (this.currentInnerIndex === index) || (this.currentInnerIndex - 1 === index) )) {
                        this.emit('onInnerDragLeave', {
                            target: this.innerDrag.getElement(index),
                            data: params.data,
                            el: params.el,
                            index: index
                        });
                        this.options.isEnter = false;
                        this.innerDragIng = false;
                        return 0;
                    } else {
                        this.emit('onInnerDrag', {
                            target: this.innerDrag.getElement(index),
                            data: params.data,
                            el: params.el,
                            index: index
                        });
                        this.options.isEnter = true;
                    }

                }

                this.innerDragIng = true;
                this.currentInnerPosIndex = index;
            }
        } else {
            if( this.options.isEnter && !this.innerDragIng) {
                this.emit('onInnerDragLeave', {
                    target: this.innerDrag.getElement(index),
                    data: params.data,
                    el: params.el,
                    index: index
                });
                this.options.isEnter = false;
            }
            this.innerDragIng = false;
            this.emit('onDragMove', params);
        }
    }
    onDragLeave(params) {
        this.emit('onDragLeave', params);
    }
    onDrop(params) {
        params.index = this.innerDrag.size;
        this.initPosition();
        if (this.innerDragIng && this.options.isEnter) {
            // 释放了鼠标，拖动中标记为false
            this.innerDragIng = false;
            this.isEnter = false;
            this.emit('onInnerDrop', {
                target: this.innerDrag.getElement(this.currentInnerPosIndex),
                el: params.el,
                data: params.data,
                index: this.innerDrag.size,
                sourceEl: params.sourceEl
            });
        } else if(!params.inner){ // 在目标区域不会生产新的元素
            this.emit('onDrop', params);
        }
    }
    onDragEnd(params) {
        this.emit('onDragEnd', params);
        this.innerDragIng = false;
        this.isEnter = false;
    }
    /*
        元素向下拖的时候，元素的底部只有到达目的地上方才算，被拖拽元素顶部离开了目标元素的下方才算离开
    */
    collision(pos) {

        let index = -1,
            i = 0,
            len = this.innerDragPosition.size,
            currentPosition = null,
            powA = 0,
            powB = 0,
            result = [],
            first = len ? this.innerDragPosition.getElement(0).top : 0,
            last = len ? this.innerDragPosition.getElement(len - 1).bottom : 0;

        for(; i < len; i++) {
            currentPosition = this.innerDragPosition.getElement(i);
            // if(pos.top >= first && pos.top <= last){
                // console.log('pos.top+pos.height', pos.top+pos.height)
                // console.log('currentPosition.bottom', currentPosition.bottom)
                // console.log('pos.top', pos.top)
                if((pos.top + pos.height) >= currentPosition.bottom - 20 && (pos.top) <= currentPosition.bottom - 20 ){
                    index = i;
                    break;
                }
            // }
        }
       /* for (; i < len; i++) {
        // 勾股定理判断鼠标和目的地的距离
        currentPosition = this.innerDragPosition.getElement(i);
            if (pos.top >= first && pos.top <= last) {

                powB = currentPosition.left - pos.left;
                powA = Math.abs(currentPosition.top - pos.top);
                result.push(Math.sqrt(Math.pow(powA, 2) + Math.pow(powB, 2)));
            }
        }
        index = util.getMin(result).index;*/
        return index;
    }
}

export default Drop;
