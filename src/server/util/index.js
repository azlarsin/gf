module.exports = {
    assignDataByObject(data, obj) {
        if(typeof data !== 'undefined') {
            Object.keys(obj).forEach(k => {
                obj[k] = k in data ? data[k] : obj[k];
            });
        }
        
        return obj;
    }
};