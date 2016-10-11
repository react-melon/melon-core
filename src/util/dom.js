/**
 * @file melon dom 相关的小工具
 * @author leon(ludafa@outlook.com)
 */

export function on(target, eventName, handler) {
    if (target.addEventListener) {
        target.addEventListener(eventName, handler);
    }
    else {
        target.attachEvent('on' + eventName, handler);
    }
}

export function off(target, eventName, handler) {

    if (target.removeEventListener) {
        target.removeEventListener(eventName, handler);
    }
    else {
        target.detachEvent('on' + eventName, handler);
    }

}

export function contains(container, contained) {
    return container.contains(contained);
}

/**
 * 获取文档的兼容根节点
 *
 * @inner
 * @param {?HTMLElement=} el 节点引用，跨 frame 时需要
 * @return {HTMLElement} 兼容的有效根节点
 */
function getCompatElement(el) {
    const doc = el && el.ownerDocument || document;
    const compatMode = doc.compatMode;
    return !compatMode || compatMode === 'CSS1Compat'
        ? doc.documentElement
        : doc.body;
}

export function getScrollLeft() {
    return window.pageXOffset || getCompatElement().scrollLeft;
}

export function getScrollTop() {
    return window.pageYOffset || getCompatElement().scrollTop;
}

export function getClientHeight() {
    return getCompatElement().clientHeight;
}

export function getClientWidth() {
    return getCompatElement().clientWidth;
}

export function getPosition(element) {

    const bound = element.getBoundingClientRect();

    const root = document.documentElement;
    const body = document.body;

    const clientTop = root.clientTop || body.clientTop || 0;
    const clientLeft = root.clientLeft || body.clientLeft || 0;
    const scrollTop = window.pageYOffset || root.scrollTop;
    const scrollLeft = window.pageXOffset || root.scrollLeft;

    return {
        left: parseFloat(bound.left) + scrollLeft - clientLeft,
        top: parseFloat(bound.top) + scrollTop - clientTop,
        width: bound.width,
        height: bound.height
    };

}

export function hasClass(element, cls) {
    return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(element, cls) {
    if (!this.hasClass(element, cls)) {
        element.className += ' ' + cls;
    }
}

export function removeClass(element, cls) {
    if (this.hasClass(element, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}
