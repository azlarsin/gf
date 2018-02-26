import * as types from "../const/ActionTypes";
import { OrderedSet } from "immutable";

const initialState = OrderedSet();

export default ( state = initialState, action ) => {
    switch (action.type) {
        case types.SEND_MESSAGE:

            return state.add(action.msg || {});

        case types.RECEIVE_MESSAGE:
            return state;

        default:
            return state;
    }
}