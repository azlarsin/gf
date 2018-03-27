// const SYS
const { ROOM_HALL, CARDS } = require('@s/const/sys');
const util = require('@s/util');
const Immutable = require('immutable');
const Random = require('random-js')();

const players = 3;  // 1 for debug
let readyUsers = Immutable.Set();

let cards;


const game = {
    async ready(data) {
        let { roomId, userId } = util.assignDataByObject(data, {
            roomId: ROOM_HALL,
            userId: ''
        });
        
        readyUsers = readyUsers.add(userId);
        
        if(readyUsers.size === players) {
            // this.socket.to(roomId).broadcast.emit('game', userId);

            // todo: 
            // 1. all hands up (done by callback())
            // 2. emit cards (game auto start)
            this.io.in(roomId).emit('GAME_START');
            // this._assignCards();
            cards = Immutable.fromJS(Random.shuffle([...CARDS]));

            // await game._assignCards.call({
            //     io: this.io,
            //     socket: this.socket
            // }, cards);
            
            let id = Random.pick([...this.socket.__users.keys()]);
            this.io.in(roomId).emit('GAME_TURN', {userId: id});


            // this.io.in(roomId).emit('GAME_START');
        }
        // update ready hands
        await this.cb(readyUsers);        
    },
    async _assignCards(cards) {
        // let users = this.socket.__users;
        // let cards = Immutable.fromJS({});
        
        // for(let k of users.keys()) {
        //     cards.set()
        // }
    },

    end() {
        // 1. settle accounts
        // 2. delete room 
    },

};

module.exports = game;