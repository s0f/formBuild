class dragDropBase {
    constructor() {

    }

    emit() {
        let args = Array.from(arguments);
        let eventName = args.shift(),
            eventParams = args.shift();
        typeof this.options[eventName] === 'function' && this.options[eventName].call(this,eventParams);
    }
}
export default dragDropBase;
