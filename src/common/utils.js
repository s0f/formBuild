let utils = {
    uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "";

        return s.join("");
    },
    unique(array) {
        let r = [];
        for (let i = 0, l = array.length; i < l; i++) {
            for (let j = i + 1; j < l; j++)
                if (array[i] === array[j]) j = ++i;
            r.push(array[i]);
        }
        return r;
    },
    fire(el, type, eventOption) {
        let eventTypeMap = {};
        eventTypeMap.click = eventTypeMap.mousemove = eventTypeMap.mousedown = eventTypeMap.mouseup = 'MouseEvents';

        let eventObj = document.createEvent(eventTypeMap[type] || 'Events'),
            bubbles = true;
        if (eventOption) {
            for (let name in eventOption) {
                name === 'bubbles' ? bubbles = !!eventOption[name] : (eventObj[name] = eventOption[name]);
            }
        }
        eventObj.initEvent(type, bubbles, true);
        el.dispatchEvent(eventObj);
    }
}

export default utils;
