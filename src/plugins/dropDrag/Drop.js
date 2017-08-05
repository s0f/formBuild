import util from './utils/index'
import dragDropBase from './dragDropBase'
import store from './store'
import List from './plugins/List'

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
                    this.emit('onInnerDragLeave', {
                        target: this.innerDrag.getElement(this.currentInnerPosIndex),
                        data: params.data,
                        el: params.el,
                        index: this.currentInnerPosIndex
                    });
                    // 忽略自己
                    if (this.options.ignoreSelf && (  (this.currentInnerIndex === index) || (this.currentInnerIndex - 1 === index) )) {
                        return 0;
                    } else {
                        this.emit('onInnerDrag', {
                            target: this.innerDrag.getElement(index),
                            data: params.data,
                            el: params.el,
                            index: index
                        });
                    }

                }

                this.innerDragIng = true;
                this.currentInnerPosIndex = index;
            }
        } else {

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
        if (this.innerDragIng) {
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
    }
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
        for (; i < len; i++) {

            currentPosition = this.innerDragPosition.getElement(i);
            if (pos.top >= first && pos.top <= last) {

                powB = currentPosition.left - pos.left;
                powA = Math.abs(currentPosition.top - pos.top);
                result.push(Math.sqrt(Math.pow(powA, 2) + Math.pow(powB, 2)));
            }
        }
        index = util.getMin(result).index;
        return index;
    }
}

export default Drop;
