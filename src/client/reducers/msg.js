import * as types from '../const/ActionTypes';
import { OrderedSet, Map } from 'immutable';

const initialState = OrderedSet();

const MESSAGE = types.MESSAGE;

export default ( state = initialState, action ) => {
    switch (action.type) {
    case MESSAGE.SEND_MESSAGE:
    case MESSAGE.RECEIVE_MESSAGE:
        return state.add(action.msg || {});

    default:
        return state;
    }
};