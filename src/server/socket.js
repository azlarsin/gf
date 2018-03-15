/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const routes = require('@s/routes');

module.exports =  io => {
    // io
    io.set('heartbeat interval', 60000);
    io.set('heartbeat timeout', 5000);

    // socket handler
    io.on('connection', async socket => {
        console.log('new connection => ', socket.id);

        // here is only one room named 'HALL' now
        let room = await routes.sys.joinRoom.call({
            io,
            socket
        });

        socket.__room = room;
        
        const channels = ['message', 'game','sys'];
        channels.forEach(channel => {
            socket.on(channel, (params, cb) => {
                // console.log('here');
                routes[channel] && routes[channel][params.path].call({
                    io,
                    socket,
                    data: params.data,
                    cb
                });
            });
        });

        // socket.on('msg', (params, cb) => {
        //     routes['msg'] && routes['msg'][params.path].call({
        //         io,
        //         socket,
        //         data: params.data,
        //         cb
        //     });
        // });

        socket.on('disconnect', () => {
            console.log('some one disconnect');
            // router.handle(io, socket, { method: 'DELETE', path: '/auth', params: { } }, () => { });
        });

        return room;
    });
};