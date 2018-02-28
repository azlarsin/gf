/**
 * Created by azlar on 24/02/2018.
 */
require('module-alias/register');

const socket = require('socket.io');
const Koa = require('koa');
const app = new Koa();

const server = require('http').Server(app.callback());
const io = new socket(server);

const configureSocket = require('./socket');

// response
app.use(async ctx => {
    ctx.body = 'hi, there';
});

// configure socket
configureSocket(io);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
