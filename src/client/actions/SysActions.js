import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';

const PLAY = types.PLAY;
const MESSAGE = types.MESSAGE;
const SYS = types.SYS;

export default {
    joinRoom(roomId = null) {
        return (dispatch) => {
            
            socket.post('sys', { path: 'joinRoom', data: { userId: 1, roomId: 'test' } }, data => {
                console.log(data);
            });
        };
    },

    getRoomId() {
        return (dispatch) => {
            socket.post('sys', { path: 'getRooms', data: { userId: 1 } }, data => { 
                dispatch({
                    type: SYS.UPDATE_ROOM,
                    roomId: data.pop()  // tmp, for user could join multiple rooms
                });
            });
        };
    }
};