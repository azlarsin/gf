import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';

const GAME = types.GAME;
const MESSAGE = types.MESSAGE;
const SYS = types.SYS;

export default {
    joinRoom(userId = 1, roomId = undefined) {
        return (dispatch) => {

            socket.post('sys', { path: 'joinRoom', data: { userId: userId, roomId } }, data => {
                let roomId = data;

                dispatch({
                    type: SYS.UPDATE_ROOM,
                    roomId: roomId  // tmp, for user could join multiple rooms
                });
            });
        };
    },

    getRoomId() {
        return (dispatch, getState) => {
            const { sys } = getState();
            
            socket.post('sys', { path: 'getRooms', data: { userId: sys.userId } }, data => { 
                dispatch({
                    type: SYS.UPDATE_ROOM,
                    roomId: data.pop()  // tmp, for user could join multiple rooms
                });
            });
        };
    },

    setUserId(id) {
        return {
            type: SYS.SET_USER_ID,
            id
        };
    }
};