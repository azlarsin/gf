
module.exports = {
    ROOM_HALL: 'HALL',
    CARDS: (() => {
        const suits = ['a', 'b', 'c', 'd'];
        const no = [];
        for(let i = 1;i <= 13;i++) {
            suits.map(v => no.push(v + i));
        }

        return no;
    })()
};