MAX_LOAD_RATIO = 0.5

SIZE_RATIO = 3

class HashMapChaining {

    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    displayValues() {
        this._hashTable.forEach(item => {
            if (item) {
                console.log(item.value)
                while (item.next) {
                    console.log(item.next);
                    item = item.next;
                }
            }
        })
    }

    get(key) {
        const index = this._findSlot(key);
        let currentItem = this._hashTable[index]

        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }

        while (currentItem.key !== key) {
            currentItem = currentItem.next;
        }
        return currentItem.value;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > MAX_LOAD_RATIO) {
            this._resize(this._capacity * SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);
        let currentItem = this._hashTable[index]

        if(!currentItem){
            this.length++;

            this._hashTable[index] = {
                key,
                value,
                next: null,
                DELETED: false
            };
        }
        else {
            while (currentItem.key !== key) {
                console.log(currentItem.key)
                if (currentItem.next === null) {
                    currentItem.next = {
                        key,
                        value,
                        next: null,
                        DELETED: false
                    }
                    this.length++
                    return;
                }
                currentItem = currentItem.next
                if (currentItem.key === key) {
                    console.log('update', key)
                    currentItem.value = value;
                    return;
                }
            }
            currentItem.value = value;
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        let slot = this._hashTable[index];
        while (slot.key !== key && slot) {
            slot = slot.next 
        }
        if (!slot) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    doesKeyExist(key) {
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            return false;
        }
        return true;
    }

    _findSlot(key) {
        const hash = HashMapChaining._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;

            //remove undeinfed in if this and just return index
            // if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            // }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (let slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                while (slot !== null) {
                this.set(slot.key, slot.value);

                slot = slot.next;
                }
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        //making sure has is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = HashMapChaining;