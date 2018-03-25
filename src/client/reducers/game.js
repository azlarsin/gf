import immutable from 'immutable';
import * as types from '@c/const/ActionTypes';

import GAME_STATUS from '@c/const/GameStatus';

const initialState = immutable.fromJS({
    readyUsers: [],
    status: GAME_STATUS.unready
});

const GAME = types.GAME;

export default ( state = initialState, action ) => {
    switch (action.type) {
    case GAME.I_M_READY: {
        
        return state.set('status', action.ready ? GAME_STATUS.ready : GAME_STATUS.unready);
    }

    case GAME.UPDATE_READY_HANDS: {        
        const readyUsers = immutable.fromJS(action.users || []);
        return state.set('readyUsers', readyUsers);
    }

    case GAME.START: {
        return state.set('status', GAME_STATUS.start);
    }

    case GAME.STARTED: {
        return state.set('status', GAME_STATUS.started);
    }

    case GAME.DROP: {
        return state.set('status', GAME_STATUS.watching);
    }

    default:
        return state;
    }
};