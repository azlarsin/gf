const HALL = 'HALL';

const sys = {
    joinRoom(roomId = HALL) {
        this.socket.join(roomId);

        if(this.cb && typeof this.cb === 'function') {
            this.cb(this.getRooms());
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
};

module.exports = sys;