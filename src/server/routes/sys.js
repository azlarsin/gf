
const Immutable = require('immutable');

const { ROOM_HALL } = require('@s/const/sys');
const { STATUS } = require('@s/const/GAME');
const util = require('@s/util');
const Game = require('@s/routes/game');
const Message = require('@s/routes/msg');

const Sys = {
    async joinRoom(data) {
        let { userId, roomId } = util.assignDataByObject(data, {
            userId: null,
            roomId: ROOM_HALL
        });
    
        
        if(!userId) {
            throw `join room failed invalid user id ${userId}`;
        }

        await this.socket.join(roomId);

        // set user-id && roomId to socket
        this.socket.__userId = userId;
        this.socket.__roomId = roomId;

        // init global.__users
        global.__users = global.__users || Immutable.OrderedMap();
        
        // the user_id will storage by server
        if(!global.__users.has(userId)) {
            global.__users = global.__users.set(userId, {
                status: STATUS.unready,
                money: 1000
            });
            
            await Game.updateGameData(roomId, this.io);
        }

        if(this.cb && typeof this.cb === 'function') {
            this.cb(roomId);
        }
        
        await this.io.in(roomId).emit('GAME_SITS', { list: [...global.__users.keys()] });
        
        await Message.sendSys(this.socket.__roomId, this.io, userId + ' 加入了房间');
        return roomId;
    },
    getRooms() {
        const rooms = Object.keys(this.socket.rooms);
        if(this.cb) {
            this.cb(rooms);
        }

        return rooms;
    },
    getUsers() {
        
    },
    
    async leaveRoom(data) {
        let { userId, roomId } = util.assignDataByObject(data, {
            userId: this.socket.__userId,
            roomId: ROOM_HALL
        });
        
        if(userId) {
            this.socket.leave(roomId);
            global.__users = global.__users.delete(userId);
            
            this.io.in(roomId).emit('GAME_SITS', { list: [...global.__users.keys()] });
            
            await Message.sendSys(this.socket.__roomId, this.io, userId + ' 撤退了');
        }
    }
};

module.exports = Sys;