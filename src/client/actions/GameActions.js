import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';
import NotifyActions from './NotifyActions';

const GAME = types.GAME;
const MESSAGE = types.MESSAGE;

export default {
    ready() {
        return (dispatch, getState) => {
            const state = getState();
            const sys = state.sys;

            socket.post('game', { path: 'ready', data: { roomId: sys.get('roomId'), userId: sys.get('userId') } }, data => {
                dispatch(this.updateReadyCount(data));
            });

            dispatch({
                type: GAME.I_M_READY,
                ready: true
            });
        };
    },

    updateReadyCount(users = []) {
        return {
            type: GAME.UPDATE_READY_HANDS,
            users
        };
    },

    // game start
    start() {
        return (dispatch) => {
            dispatch(NotifyActions.setAlert('Game starting...'));
            
            dispatch({
                type: GAME.START
            });
        };
    },

    // animation end
    started() {
        return {
            type: GAME.STARTED
        };
    },
    
    setTurn(userId) {
        return {
            type: GAME.SET_TURN,
            userId
        };
    },

    myTurn() {

    },

    stuffy() {

    },

    look() {
        return (dispatch, getState) => {
            let dblClickEvent= document.createEvent('MouseEvents'); 
            dblClickEvent.initEvent('dblclick', true, true); 
            
            Array.prototype.map.call(document.querySelectorAll('.card-wrap.bg > div'), dom => dom.dispatchEvent(dblClickEvent));
        };
    },

    follow() {

    },

    drop() {
        return {
            type: GAME.DROP
        };
    }
};
