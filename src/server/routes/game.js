
// const SYS
const { ROOM_HALL, CARDS } = require('@s/const/sys');
const util = require('@s/util');
const Immutable = require('immutable');

const players = 1;  // 1 for debug
let readyUsers = Immutable.Set();

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
            
        }
        // update ready hands
        await this.cb(readyUsers);

        this.io.in(roomId).emit('GAME_START');
    },
    send() {
        // console.log('here', Object.keys(this));

        // todo: save msg to db

    
        // broadcast
        let room = Object.keys(this.socket.rooms).pop();
        this.socket.to(room).broadcast.emit('msg', this.data);

        // cb
        this.cb();
    },

    end() {
        // 1. settle accounts
        // 2. delete room 
    },

};

module.exports = game;