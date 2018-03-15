import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';

const PLAY = types.PLAY;
const MESSAGE = types.MESSAGE;

export default {
    ready() {
        return (dispatch, getState) => {
            const state = getState();
            const sys = state.sys;

            socket.post('game', { path: 'ready', data: { roomId: sys.roomId, userId: 1 } }, data => {
                console.log(data);
            });

            // dispatch({
            //     type: 'update'
            // });
        };
    },

    updateReadyCount() {

    },

    // same with start
    receiveCards(count = 3) {

    },
    
    myTurn() {

    },

    stuffy() {

    },

    look() {

    },

    follow() {

    },

    drop() {

    }
};
