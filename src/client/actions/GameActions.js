import Immutable from 'immutable';

import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';
import { generateSits } from '@c/util';
import NotifyActions from './NotifyActions';
import { EFAULT } from 'constants';

const GAME = types.GAME;
const MESSAGE = types.MESSAGE;

export default {
    updateGameData(userData = null, sysInfo = null) {
        return {
            type: GAME.UPDATE_GAME_DATA,
            userData,
            sysInfo
        };
    },

    setSits(list = []) {
        return (dispatch, getState) => {
            const state = getState();
            const userId = state.sys.get('userId');

            dispatch({
                type: GAME.SET_SITS,
                list: generateSits(list, userId)
            });
            
        };
    },

    ready() {
        return async (dispatch, getState) => {
            const state = getState();
            const sys = state.sys;

            await socket.post('game', { path: 'ready', data: { roomId: sys.get('roomId'), userId: sys.get('userId') } }, () => {
                
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
        return async (dispatch, getState) => {
            const state = getState();
            const sys = state.sys;

            dispatch({
                type: GAME.SET_TURN,
                myTurn: sys.get('userId') === userId,
                userId
            });
        };
    },

    myTurn() {

    },

    stuffy() {

    },

    lookOne() {

    },

    look(specify = null) {
        return async (dispatch, getState) => {
            const state = getState();
            const game = state.game;
            const sys = state.sys;
            let userId = sys.get('userId');
            let myCards = game.get('cardsMap').get(userId) || new Immutable.List();
            
            new Promise(resolve => {
                
                socket.post('game', { path: 'look', data: { specify } }, data => {
                    myCards = (specify && myCards.get(specify) === undefined) ? 
                        myCards.set(specify, data)
                        :
                        myCards = Immutable.List(data);

                    resolve(myCards);
                }); 
            }).then(myCards => {
                dispatch({
                    type: GAME.ASSIGN_CARDS,
                    userId,
                    cards: myCards
                });
            });

            // let dblClickEvent= document.createEvent('MouseEvents'); 
            // dblClickEvent.initEvent('dblclick', true, true); 
            
            // Array.prototype.map.call(document.querySelectorAll('.card-wrap.bg > div'), dom => dom.dispatchEvent(dblClickEvent));
        };
    },

    follow(money = null, stuffy = false) {
        return async (dispatch, getState) => {
            let state = getState();
            let sits = state.game.get('sits');
            let nextUserId = sits.get(1);   // ordered list
  
            socket.post('game', { path: 'follow', data: { money, nextUserId } }, () => {
                    
            });    
        };
    },

    drop() {
        return {
            type: GAME.DROP
        };
    }
};
