
const util = require('@s/util');

const Message = {
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
    },
    sendSys(roomId = null, io = null, msg = '', socket = null) {
        io = io || this.io || null;
        roomId = !roomId ? (socket ? socket.__roomId : null) : roomId;

        if(!io || !roomId || !msg) 
            return ;

        io.in(roomId).emit('msg', {
            userId: 'sys',
            text: msg
        });
    }
};

module.exports = Message;