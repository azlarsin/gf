const Immutable = require('immutable');
const { ROOM_HALL } = require('@s/const/sys');
const util = require('@s/util');

const sys = {
    async joinRoom(data) {
        let { userId, roomId } = util.assignDataByObject(data, {
            userId: null,
            roomId: ROOM_HALL
        });
    
        await this.socket.join(roomId);

        this.socket.__users = this.socket.__users || Immutable.fromJS({});
        this.socket.__users = this.socket.__users.set(userId);
        
        if(this.cb && typeof this.cb === 'function') {
            this.cb(roomId);
        }

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
            userId: null,
            roomId: ROOM_HALL
        });
        
        await this.socket.leave(roomId);

        this.socket.__users = this.socket.__users.delete(userId);
    }
};

module.exports = sys;