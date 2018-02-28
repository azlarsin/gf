
const message = require("./msg");

const HALL = 'HALL';

module.exports = {
    joinRoom(roomId = HALL) {
        this.socket.join(roomId);

        return roomId;
    },
    getRooms() {
        return this.socket.rooms;
    },
    message
};