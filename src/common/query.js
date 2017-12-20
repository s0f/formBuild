class Query {
    matchesSelector (el, selector) {
        let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
        return matchesSelector.call(el, selector);
    }
    insertAfter　(targetElement, newElement) {
        const parentEl = targetElement.parentElement;
        if (parentEl.lastElementChild === targetElement) {
            parentEl.appendChild(newElement);
        } else {
            parentEl.insertBefore(targetElement, newElement);
        }
    }
    css(el, property) {
        return window.getComputedStyle(el).getPropertyValue(property);
    }
    index(arr, el) {
        let elIndex = -1;
        let els = arr || [];
        for (let idx = 0, len = els.length; idx < len; idx++){
            if (els[idx] == el) {
                elIndex = idx;
            }
        }
        return elIndex;
    }
    parents(el, selector) {
        while (el) {
            if (this.matchesSelector(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    }
    siblings(el, selector) {
        let allSiblings = el.parentElement.children,
            result = [];
        
        for (let idx = 0, len = allSiblings.length; idx < len; idx++){
            if (allSiblings[idx] != el && this.matchesSelector(allSiblings[idx], selector || '')) {
                result.push(allSiblings[idx]);
            }
        }
        return result;
    }
}

let $ = new Query();
export default $;
