import util from './utils'
const store = {
    targets: [], // 存放接收拖拽对象的DOM
    targetPosition: [], // 拖拽对象的位置
    dragStartHandleList: [],
    dragEnterHandleList: [],
    dragMoverHandleList: [],
    dragLeaveHandleList: [],
    dropHandleList: [],
    dragEndHandleList: [],
    isEnter: false,
    preIndex: -1,
    sourceEl: null,

    onDragStart(data, elem) {
        let params = {
            sourceEl: elem
        };
        this.sourceEl = elem;
        this.dragStartHandleList.forEach((fn, index) => fn && fn(params));
    },
    onDragMove(pos) {
        let index = this.collision(pos),
            params = null;

        if (index >= 0) {

            if (this.preIndex !== index) {
                this.isEnter = false;
                // 从一个接收对象跑到另外一个接受对象时
                if (this.preIndex !== -1) {
                    params = {
                        el: this.targets[this.preIndex].el,
                        sourceEl: this.sourceEl,
                    };
                    this.dragLeaveHandleList[this.preIndex](params);

                }
            }
            this.preIndex = index;
            // 第一次进入接收对象
            if (!this.isEnter) {
                this.isEnter = true;
                params = {
                    el: this.targets[index].el,
                    sourceEl: this.sourceEl,
                };
                this.dragEnterHandleList[index](params);
            }
            params = {
                el: this.targets[index].el,
                sourceEl: this.sourceEl,
                pos: pos,
            };
            // 在接收对象上移动 使用节流会有BUG，在从第一个接收对象进入第二个的时候会触发第一个的移动事件
            util.throttle(this.dragMoverHandleList[index], params, this);
            // this.dragMoverHandleList[index](params);
        } else {
            // 移出接收对象
            if (this.isEnter) {
                params = {
                    el: this.targets[this.preIndex].el,
                    sourceEl: this.sourceEl,
                    pos: pos,
                };
                this.isEnter = false;
                this.dragLeaveHandleList[this.preIndex](params);
            } else {

                this.preIndex = -1;
            }
        }
    },
    onDragEnd(data, isInner) {
        if (this.preIndex === -1) {
            this.dragEndHandleList.forEach((method, index) => method && method({
                el: document.body,
                sourceEl: this.sourceEl,
                data: data,
            }));
        } else {

            let params = {
                el: this.targets[this.preIndex].el,
                sourceEl: this.sourceEl,
                data: data,
                inner: isInner
            };
            this.preIndex >= 0 && (this.dropHandleList[this.preIndex](params));
            this.dragEndHandleList.forEach((method, index) => method && method(params));
        }
    },
    collision(pos) {
        let targetPos = null,
            index = -1,
            len = this.targets.length,
            i = 0;

        for (; i < len; i++) {
            targetPos = this.targetPosition[i];
            if (pos.left + pos.width >= targetPos.left
                && pos.left <= targetPos.right
                && pos.top + pos.height >= targetPos.top
                && pos.top <= targetPos.bottom) {
                index = i;
                break;
            }
        }

        return index;
    }
};

export default store
