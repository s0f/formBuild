
const utils = {
    getTransform() {
        let transform = '',
            transformPrefix = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'oTransform'],
            divStyle = document.createElement('div').style,
            len = transformPrefix.length,
            i = 0;
        for (; i < len; i++) {
            if (transformPrefix[i] in divStyle) {
                return transformPrefix[i];
            }
        }
        return transform;
    },
    $(selector) {
        return (typeof selector === 'string' && selector !== '') ? document.querySelector(selector) : console.error('请提供正确的选择器');
    },
    hasClass(el, className) {
        return el.classList.contains(className);
    },
    getStyle(elem, property) {
        return document.defaultView.getComputedStyle
            ? document.defaultView.getComputedStyle(elem, false)[property] :
            elem.currentStyle[property];

    },
    checkOptions(options) {
        return typeof options === 'object' ? options : console.error('请传入配置参数!');
    },
    on(el, event, fn, capture) {
        el.addEventListener(event, fn, capture || false);
    },
    off(el, event, fn, capture) {
        el.removeEventListener(event, fn, capture || false);
    },
    throttle(method, params, context, time) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context, params);
        }, time || 30);
    },
    createMarkNode() {
        let markDom = null;
        utils.createMarkNode = (function () {
            if (!markDom) {
                markDom = document.createElement('div');
                const styles = {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '10',
                    display: 'block'
                };
                markDom.className = 'x-drag-mark';
                for (let style in styles) {
                    markDom.style[style] = styles[style];
                }

                return markDom;
            } else {
                return markDom;
            }
        });
        return utils.createMarkNode();
    },
    clearMarkNode() {
        // this.$('.x-drag-mark').style.display = 'none';
        document.body.removeChild(this.$('.x-drag-mark'))
    },
    getOffset(elem) {
        let offsetLeft = elem.offsetLeft,
            offsetTop = elem.offsetTop,
            parent = elem.parentChild;
        while (parent) {
            offsetLeft += parent.offsetLeft;
            offsetTop += parent.offsetTop;
        }
        return {
            top: offsetTop,
            left: offsetLeft,
            width: elem.offsetWidth,
            height: elem.offsetHeight
        }
    },
    insertAfter(targetElement, newElement) {
        let parentEl = targetElement.parentElement;
        if (parentEl.lastElementChild === targetElement) {
            parentEl.appendChild(newElement);
        } else {
            targetElement.nextElementSibling.insertBefore(newElement);
        }
    },
    getMin(array) {
        let min = array[0],
            idx = 0;
        if (array.length === 0) {
            return {
                value: -1,
                index: -1
            }
        }
        array.forEach(function (element, index) {
            if (index !== 0) {
                if (element < min) {
                    min = element;
                    idx = index;
                }
            }

        }, this);

        return {
            value: min,
            index: idx
        }
    },
    parents: function (el, selector) {
        let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    }
}

export default utils;
