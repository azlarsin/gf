

const io = require('socket.io-client');

const serverUrl = 'http://localhost:3000';
let platformSocketParam = { };

function regSocket(socket) {
    console.log(socket);
    socket.__TOKEN__ = 'token';
    
    socket.post = function (path, data, cb) {
        if (data && typeof socket.__TOKEN__ === 'string' && socket.__TOKEN__ !== '') {
            data.__TOKEN__ = socket.__TOKEN__;
        }

        socket.emit(path, data, cb || (() => {
            return true;
        }));
    };

    return socket;
}

export default regSocket(io(serverUrl, {transports: ['websocket', 'polling', 'flashsocket']}));