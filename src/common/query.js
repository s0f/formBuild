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
}

let $ = new Query();
export default $;
