import * as types from '../const/ActionTypes';
import { OrderedSet } from 'immutable';

const initialState = OrderedSet().add({
    text: 'test',
    userId: 1
}).add({
    text: '21382137217371237120937217392713721937219739212138213721737123712093721739271372193721973921213821372173712371209372173927137219372197392121382137217371237120937217392713721937219739212138213721737123712093721739271372193721973921',
    userId: 1,
    self: true
});

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