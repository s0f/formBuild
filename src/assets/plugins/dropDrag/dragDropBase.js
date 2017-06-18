/*function dragDropBase() {

}
dragDropBase.prototype = {
    constructor: dragDropBase,
    emit: function () {
        var eventName = arguments.shift(),
            eventParams = arguments.shift();
        typeof this.options[eventName] === 'function' && this.options[eventName](eventParams);
    }
}
*/
class dragDropBase {
    constructor() {

    }

    emit() {
        var args = Array.from(arguments);
        var eventName = args.shift(),
            eventParams = args.shift();
        typeof this.options[eventName] === 'function' && this.options[eventName].call(this,eventParams);
    }
}
export default dragDropBase;
