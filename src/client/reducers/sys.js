import * as types from '../const/ActionTypes';
import immutable from 'immutable';

const initialState = immutable.fromJS({
    roomId: null,
    userId: null,
    userName: null,
});

const SYS = types.SYS;

export default ( state = initialState, action ) => {
    switch (action.type) {
    case SYS.UPDATE_ROOM: {
        const id = action.roomId || null;
        return state.set('roomId', id);
    }

    case SYS.SET_USER_ID: {
        const id = action.id || null;
        return state.set('userId', id);
    }

    default:
        return state;
    }
};