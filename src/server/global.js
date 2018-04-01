const Immutable = require('immutable');

const routes = require('@s/routes');
const { CONFIG } = require('@s/const/GAME');

const Game = routes.game;
const Message = routes.message;


module.exports =  async io => {

    global.__users = Immutable.OrderedMap();

    /**
     * todo: separate __game & __users into by rooms like:
     * 
     * global.users = new Map();
     * global.games = new Map();
     * global.users.add(roomId, __users);
     * global.users.add(roomId, __game);    // new Proxy could by set as an class, and it could has a key: roomId in it(for watching).
     * 
     * OR
     * 
     * make this file as a class, new it when a room was created.
     */
    

    global.__game = new Proxy({
        ...CONFIG,
        activeId: null
    }, {
        set: function (obj, prop, value) {
            let oldValue = obj[prop];
            obj[prop] = value;

            if(prop === 'activeId' && value !== oldValue) {
                io.in('HALL').emit('GAME_TURN', { userId: value });
            }else {
                // io.in('HALL').emit('msg', {
                //     userId: 'sys',
                //     text: `当前底：${obj.stake * Math.pow(2, obj.double)}\r\n当前奖池：${obj.pool}`
                // });

                Message.sendSys('HALL', io, `当前底：${obj.stake * Math.pow(2, obj.double)}\r\n当前奖池：${obj.pool}`);
                
                // sync info
                Game.updateGameData('HALL', io);
            }
            
            return true;
        }
    });
};