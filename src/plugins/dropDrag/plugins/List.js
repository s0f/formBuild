import FSort from './FSort';

let sort = new FSort({
    key: 'bottom',
    type: 'descending'
});

class List {
    constructor() {
        this.size = 0;
        this.pos = 0;
        this.dataStore = [];
    }

    add(element) {
        this.dataStore[this.size++] = element;
    }

    addList(elementList) {
        let self = this;
        elementList.forEach(function (element) {
           self.add(element);
        });
    }

    clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.size = this.pos = 0;
    }

    find(element) {
        let i = 0,
            len = this.dataStore.length;
        for (; i < len; i++){
            if (this.dataStore[i] === element) {
                return i;
            }
        }
        return -1;
    }

    insert(element, afterElement, isReplace) {
        let insertPos = this.find(afterElement);
        if (insertPos > -1) {
            isReplace ? this.dataStore.splice(insertPos, 1, element) : this.dataStore.splice(insertPos, 0, element);
            ++this.size;
            return true;
        }
        return false
    }

    remove(element) {
        let foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.size;
            return true;
        }
        return false;
    }

    front() {
        this.pos = 0;
    }

    end() {
        this.pos = this.size - 1;
    }

    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    next() {
        if (this.pos < this.size - 1) {
            ++this.pos;
        }
    }

    currPos() {
        return this.pos;
    }

    length() {
        return this.size;
    }

    moveTo(position) {
        this.pos = position;
    }

    getElement(pos) {
        pos !== undefined && this.moveTo(pos);
        return this.dataStore[this.pos];
    }

    contains(element) {
        let i = 0,
            len = this.dataStore.length;
        for (; i < len; i++){
            if (this.dataStore[i] === element) {
                return true;
            }
        }
        return false;
    }

    sort(sortType, sortKey) {
        sortType = sortType || 'default';

        switch (sortType) {
            case 'default':
                sort.start(this.dataStore, 'bottom', 'ascending');
                break;
            default:
                sort.start(this.dataStore, 'bottom', 'ascending');
                break;

        }
    }

    toString() {
        return this.dataStore;
    }
}


export default List;
