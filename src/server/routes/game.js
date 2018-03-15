
const game = {
    ready(userId = '') {
        console.log('someone is ready');

        
        this.cb('22');
        
    },
    send() {
        // console.log('here', Object.keys(this));

        // todo: save msg to db

    
        // broadcast
        let room = Object.keys(this.socket.rooms).pop();
        this.socket.to(room).broadcast.emit('msg', this.data);

        // cb
        this.cb();
    }

};

module.exports = game;