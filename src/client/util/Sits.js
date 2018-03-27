class Sits {
    constructor(list = [], cur = 0) {
        if(!isArray(list)) {
            throw 'invalid list';
        }
        
        this.cur = cur;

        this.list = [ ...list ];

        this.length = this.list.length;
    }

    append(val) {
        this.list.push(val);
        this.length = this.list.length;
    }

    remove(val) {

        let targetIndex = this.list.findIndex((v) => v === val);

        if(targetIndex !== -1) {
            this.list.splice(targetIndex, 1);
        }

        this.length = this.list.length;
    }
    
    value() {
        return this.list[this.cur];
    }

    next() {
        this.cur++;
        
        if(this.cur === this.length) {
            this.cur = 0;
        }

        return this.value();
    }

    prev() {
        this.cur--;

        if(this.cur === -1) {
            this.cur = this.length - 1;
        }

        return this.value();
    }

    size() {
        return this.length;
    }
}

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}


// let arr = [1,3,0,2];

// let b = new Sits(arr);

// console.log(b.value());
// console.log(b.next());
// console.log(b.next());
// console.log(b.next());
// console.log(b.next());
// console.log(b.prev());

module.exports = {
    Sits
};
