import Immutable from 'immutable';
import * as types from '@c/const/ActionTypes';

import roles from '@c/const/Roles';

import GAME_STATUS from '@c/const/GameStatus';

const initialState = Immutable.fromJS({
    sits: Immutable.List(),
    activeUserId: null,
    readyUsers: Immutable.Set(),
    status: GAME_STATUS.unready,
    myTurn: false,
    userData: Immutable.Map(),
    sysInfo: Immutable.Map(),
    cardsMap: Immutable.Map(),
    role: null
});

const GAME = types.GAME;

export default ( state = initialState, action ) => {
    switch (action.type) {
    case GAME.SET_ROLE: {
        const id = action.id || null;
        let role = roles.find(r => r.id === id);
        
        return state.set('role', role);
    }
    
    case GAME.UPDATE_GAME_DATA: {
        let data = Immutable.Map(action.userData);
        let sysInfo = Immutable.Map(action.sysInfo);

        return state.set('userData', data).set('sysInfo', sysInfo);
    }

    case GAME.SET_SITS: {
        let list = action.list || [];
        return state.set('sits', Immutable.List(list));
    }

    case GAME.I_M_READY: {
        return state.set('status', action.ready ? GAME_STATUS.ready : GAME_STATUS.unready);
    }

    case GAME.UPDATE_READY_HANDS: {        
        const readyUsers = Immutable.Set(action.users || []);
        let cardsMap = state.get('cardsMap');

        // init cardsMap
        readyUsers.forEach(userId => {
            cardsMap = cardsMap.set(userId, Immutable.List());
        });
        return state.set('readyUsers', readyUsers).set('cardsMap', cardsMap);
    }

    case GAME.START: {
        return state.set('status', GAME_STATUS.start);
    }

    case GAME.STARTED: {
        return state.set('status', GAME_STATUS.started);
    }

    case GAME.SET_TURN: {
        let myTurn = action.myTurn;
        let status = myTurn ? GAME_STATUS.myTurn : state.get('status');
        
        return state.set('activeUserId', action.userId)
            .set('myTurn', myTurn)
            .set('status', status);
    }

    case GAME.ASSIGN_CARDS: {
        let userId = action.userId;
        let cards = action.cards;
        let cardsMap = state.get('cardsMap');

        cardsMap = cardsMap.set(userId, cards);

        return state.set('cardsMap', cardsMap);
    }

    case GAME.DROP: {
        return state.set('status', GAME_STATUS.watching);
    }

    default:
        return state;
    }
};