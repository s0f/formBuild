class Query {
    static insertAfter　(targetElement, newElement) {
        const parentEl = targetElement.parentElement;
        if (parentEl.lastElementChild === targetElement) {
            parentEl.appendChild(newElement);
        } else {
            parentEl.insertBefore(targetElement, newElement);
        }
    }
}

let $ = new Query();
export default $;
