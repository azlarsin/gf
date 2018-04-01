
module.exports = {
    STATUS: {
        unready: 0,
        ready: 1,
        unlooked: 10,
        looked: 100,
        watching: 900,       // dropped
    },

    CONFIG: {
        min: 1,
        max: 50,
        stake: 1,
        double: 0,  // Math.pow(2, double)
        pool: 0
    }
};