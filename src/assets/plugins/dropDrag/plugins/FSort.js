/**
 * 默认、降序、升序
 */
class Sort {
    constructor(options) {
        const typeList = { 'descending': 1, 'ascending': 2 };
        let defaultOptions = {
            key: ''
        }
        Object.assign(defaultOptions, options);
    }

    start(array, key, sortType) {
        let sortMethod = this[sortType];

        if (typeof sortMethod != 'function') {
            throw ('不支持${sortType}这种排序');
        }
        this[sortType](array, key);
    }

    ascending(array, key) {
        return this.bubbleSort2(array, key);
    }

    bubbleSort2(arr, key) {
        var i = arr.length - 1;  //初始时,最后位置保持不变

        while (i > 0) {

            var pos = 0; //每趟开始时,无记录交换

            for (var j = 0; j < i; j++)
                if (arr[j][key] > arr[j + 1][key]) {
                    pos = j; //记录交换的位置
                    var tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                }
            i = pos; //为下一趟排序作准备
        }
        return arr;
    }
}

export default Sort;

