/**
 * Created by azlar on 24/02/2018.
 */

const socket = require('socket.io');
const Koa = require('koa');
const app = new Koa();

const server = require('http').Server(app.callback());
const io = new socket(server);

// response
app.use(async ctx => {
    ctx.body = 'Hello World';
});


// io
// io.set('heartbeat interval', 60000);
// io.set('heartbeat timeout', 5000);



// socket handle
io.on('connection', socket => {
    console.log('new connection => ', socket.id);

    socket.on('msg', (data, cb) => {
        // console.log(io.clients());
        // socket.emit('receive-msg', msg);
        try {
            // do sth with db

        } catch(e) {
            
        }
        cb(data);
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
        // router.handle(io, socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
