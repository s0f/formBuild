/*
 * @Author: ssf
 * @Date: 2017-04-07 11:15:00
 * @Last Modified by: ssf
 * @Last Modified time: 2017-04-15 17:34:18
 */

/**
 * 被拖动对象，对象上存储一份数据，到达目的后可以被获取
 * 功能：
 *
 *
 */
import util from './utils/index'
import store from './store'
import dragDropBase from './dragDropBase'

class Drag extends dragDropBase {
    /**
     * @param  {Element} el
     * @param  {Object} options {data: '', onDragStart: function (params) {}, onDragEnd: function (params) {}}
     * new Drag('.item', options)
     */
    constructor(el, options) {
        super();
        this.wrap = util.$(el);
        this.options = util.checkOptions(options);
        if (!this.options) {
            this.options = {
                inner: false
            }
        }

        this.isMouseDragging = false;
        this.minDoubleMouseDownTime = 0;
        this.init();
    }

    init() {
        this.bindHandle();
        this.registerEvent();
        this.transform = util.getTransform();
    }

    bindHandle() {
        this._startHandler = this.startHandler.bind(this);
        this._endHandler = this.endHandler.bind(this);
        this._moveHandler = this.moveHandler.bind(this);
        this.wrap.addEventListener('mousedown', this._startHandler, false);
    }

    /**
     * 先store注册回调事件
     */
    registerEvent() {

    }

    // 开始拖动时
    startHandler(event) {
        let target = util.parents(event.target, '.drag-item');

        if (!target) {
            return false;
        }

        if (this.minDoubleMouseDownTime === 0) {
            this.minDoubleMouseDownTime = new Date().getTime();
        } else {
            if (new Date().getTime() - this.minDoubleMouseDownTime < 1000) {
                this.minDoubleMouseDownTime = new Date().getTime();
                return false;
            }
        }
        this.mouseDownPosition = {
            x: event.pageX,
            y: event.pageY
        };
        this.cloneNode = target.cloneNode(true);
        this.cloneNode.setAttribute('style', 'position: fixed;display: none;margin: inherit;list-style: none;');
        this.cloneNode.style.left = event.pageX + 'px;';
        this.cloneNode.style.top = event.pageY + 'px;';
        document.addEventListener('mouseup', this._endHandler, false);
        this.wrap.addEventListener('mousemove', this._moveHandler, false);
        this.wrap.addEventListener('mouseup', this._endHandler, false);
        console.log('tt', event.pageX, event.pageY)

    }

    moveHandler(event) {
        let target = util.parents(event.target, '.drag-item');

        store.onDragStart(this.options.data, target);

        let markNode = util.createMarkNode(),
            offset = null,
            tempOffset,
            params;

        document.body.appendChild(markNode);
        markNode.appendChild(this.cloneNode);
        this.markNode = markNode;
        this._markNodeMouseMove = this.markNodeMouseMove.bind(this);
        window.onmousemove = this.markNodeMouseMove.bind(this);
        window.onmouseup = this.markNodeMouseUp.bind(this);

        tempOffset = this.getOffset(target);
        if (this.options.inner) {
            offset = {
                left: target.offsetLeft,
                top: target.offsetTop
            }
        } else {
            offset = tempOffset;
        }
        // this.startX = this.options.inner ? offset.left : event.pageX;
        // this.startY = this.options.inner ? offset.top : event.pageY;
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.sourceX = tempOffset.left;
        this.sourceY = tempOffset.top;
        this.setTargetPosition({
            X: offset.left,
            Y: offset.top
        });

        params = {
            data: this.options.data,
            el: target
        };

        this.emit('onDragStart', params);

    }

    endHandler() {
        this.wrap.removeEventListener('mousemove', this._moveHandler, false);
        this.wrap.removeEventListener('mouseup', this._endHandler, false);
        document.removeEventListener('mousedown', this._startHandler, false);
    }

    markNodeMouseMove(event) {

        let currentX = event.pageX,
            currentY = event.pageY,
            distanceX = this.startX - this.sourceX,//currentX - this.startX,
            distanceY = this.startY - this.sourceY,//currentY - this.startY,
            targetPos = {
                X: Number.parseInt((currentX - distanceX /*+ this.sourceX*/).toFixed()),
                Y: Number.parseInt((currentY - distanceY /*+ this.sourceY*/).toFixed()),
            };
        if (currentX === this.startX && currentY === this.startY) {
            // util.parents(event.target, '.sft-form').click();
            // event.target.click();
            return false;
        }

        if (!this.isMouseDragging) {
            this.cloneNode.style.display = 'block';
            this.isMouseDragging = true;
        }
        this.setTargetPosition(targetPos);
        store.onDragMove({
            left: targetPos.X,
            top: targetPos.Y,
            width: this.cloneNode.offsetWidth,
            height: this.cloneNode.offsetHeight
        });
    }

    markNodeMouseUp() {
        window.onmousemove = null;
        window.onmouseup = null;
        if (this.options.inner) {
            store.onDragEnd(this.options.data, true);
        } else {
            store.onDragEnd(this.options.data);
        }
        util.clearMarkNode();
        this.cloneNode.remove();
        this.isMouseDragging = false;
    }

    setTargetPosition(pos) {
        if (this.transform) {
            this.cloneNode.style[this.transform] = 'translate(' + pos.X + 'px,' + pos.Y + 'px)';
        } else {
            this.cloneNode.style.left = pos.X + 'px';
            this.cloneNode.style.top = pos.Y + 'px';
        }
    }

    getOffset(Node, offset) {
        if (!offset) {
            offset = {};
            offset.top = 0;
            offset.left = 0;
        }
        if (Node === document.body) {//当该节点为body节点时，结束递归
            return offset;
        }
        offset.top += Node.offsetTop;
        offset.left += Node.offsetLeft;
        return this.getOffset(Node.offsetParent, offset);//向上累加offset里的值

    }

    getTargetPosition(elem) {
        let pos = {
                X: 0,
                Y: 0
            },
            x = 0,
            y = 0,
            transformValue = '';

        if (this.transform) {
            transformValue = util.getStyle(elem, this.transform);
            if (transformValue === 'none') {
                elem.style[this.transform] = 'translate(0,0)';
            } else {
                let temp = transformValue.match(/-?\d+/g);
                x = temp[4].trim();
                y = temp[5].trim();
            }
        } else {
            if (util.getStyle(elem, 'position') === 'static') {
                elem.style['position'] = 'absolute';
            } else {
                x = util.getStyle(elem, 'left');
                y = util.getStyle(elem, 'top');
            }
        }
        pos.X = Number.parseInt(x) || 0;
        pos.Y = Number.parseInt(y) || 0;
        return pos;
    }
}

export default Drag;
