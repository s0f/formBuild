class Query {
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
        let els = arr.children || [];
        for (let idx = 0, len = els.length; idx < len; idx++){
            if (els[idx] == el) {
                elIndex = idx;
            }
        }
        return elIndex;
    }
}

let $ = new Query();
export default $;
