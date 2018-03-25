
const util = require('@s/util');

const message = {
    receive(data) {
        
    },
    send(data) {
        let { userId, text } = util.assignDataByObject(data, {
            userId: 1,
            text: ''
        });
        // console.log('here', Object.keys(this));

        // todo: save msg to db
        
        // broadcast
        let room = Object.keys(this.socket.rooms).pop();
        this.socket.to(room).broadcast.emit('msg', { userId, text });

        // cb
        this.cb();
    }

}

module.exports = message;