// const SYS
const { ROOM_HALL, CARDS } = require('@s/const/SYS');
const { STATUS, CONFIG } = require('@s/const/GAME');
const Message = require('@s/routes/msg');
const util = require('@s/util');
const Immutable = require('immutable');
const Random = require('random-js')();

const players = 1;  // 1 for debug
let readyUsers = Immutable.Set();

const Game = {
    usersCardsMap: Immutable.Map(),
    
    async ready(data) {
        let { roomId, userId } = util.assignDataByObject(data, {
            roomId: ROOM_HALL,
            userId: null
        });

        let prevReadyUsers = readyUsers;
        
        // this is for server, don't need to update client user-data
        global.__users = global.__users.update(userId, info => {
            if(info.status === STATUS.unready) {
                // add to ready users
                if(!readyUsers.has(userId)) {
                    readyUsers = readyUsers.add(userId);
                }

                return {
                    ...info,
                    status: STATUS.ready
                }; 
            }

            return info;
        });

        // same user sending ready
        if(prevReadyUsers === readyUsers) {
            return ;
        }

        

        // update ready hands
        this.io.in(roomId).emit('GAME_UPDATE_READY', { readyUsers });

        // start game
        if(readyUsers.size === players) {
            // this.socket.to(roomId).broadcast.emit('game', userId);
            
            // 1. game start
            this.io.in(roomId).emit('GAME_START');
            
            // 2. deal with pool and cards
            let pool = global.__game.pool;
            let randomCards = [...Random.shuffle([...CARDS])];
            
            // Game.usersCardsMap.clear();
            await [...global.__users.keys()].forEach(uid => {                
                // update info
                global.__users.update(uid, info => {
                    if(info.status === STATUS.ready) {
                        info.status = STATUS.unlooked;
                        info.money -= CONFIG.min;   // 放底
                        
                        pool += CONFIG.min;

                        // assign cards
                        Game.usersCardsMap = Game.usersCardsMap.set(uid, randomCards.splice(0, 3));
                    }
                });
            });

            // set random turn user
            let id = Random.pick([ ...global.__users.keys() ]);

            // sending msg
            global.__game.pool = pool;
            global.__game.activeId = id;

            await Game.updateGameData(roomId, this.io);
        }
    },
    
    async look(data) {
        let { specify } = util.assignDataByObject(data, {
            specify: null
        });

        let userId = this.socket.__userId;
        let cards = Game.usersCardsMap.get(this.socket.__userId);

        if(cards) {
            // update users
            global.__users = global.__users.update(userId, info => {
                return {
                    ...info,
                    status: STATUS.looked
                }; 
            });
            
            this.cb(!specify ? cards : cards[specify]);

            await Message.sendSys(this.socket.__roomId, this.io, userId + ' 看牌了'); // tmp: now will use userName as id
            await Game.updateGameData(this.socket.__roomId, this.io);
        }
    },

    async follow(data) {
        let nowGame = { ...global.__game };
        let userId = this.socket.__userId;
        let roomId = this.socket.__roomId;
        let userData = global.__users.get(userId);
        
        if(!userData) {
            throw 'no user data';
        }
        
        let { money, nextUserId } = util.assignDataByObject(data, {
            money: nowGame.stake,
            nextUserId: null
        });

        money = Math.min(Math.max(nowGame.min, money), nowGame.max);
        
        if(userData.money >= money) {
            global.__users = global.__users.update(userId, info => {
                
                nowGame.pool += money;
                nowGame.stake = userData.status === STATUS.looked ? 1 : 2;

                return {
                    ...info,
                    money: info.money - money
                };
            });
            
            global.__game.pool = nowGame.pool;
            global.__game.stake = nowGame.stake;
            global.__game.activeId = nextUserId;
            

            await Game.updateGameData(roomId, this.io);
            
            this.cb(true);
        }
    },

    end() {
        // 1. settle accounts
        // 2. delete room 
    },

    async updateGameData(roomId = null, io = null) {
        io = io || this.io || null;

        if(!io || !roomId) 
            return ;

        io.in(roomId).emit('UPDATE_GAME_DATA', { userData: global.__users.toJSON(), sysInfo: { ...global.__game } });
    },
};

module.exports = Game;