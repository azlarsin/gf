import * as types from "../const/ActionTypes";
import { OrderedSet } from "immutable";

const initialState = OrderedSet().add({
    text: "test",
    userId: 1
}).add({
    text: "21382137217371237120937217392713721937219739212138213721737123712093721739271372193721973921213821372173712371209372173927137219372197392121382137217371237120937217392713721937219739212138213721737123712093721739271372193721973921",
    userId: 1,
    self: true
});

export default ( state = initialState, action ) => {
    switch (action.type) {
        case types.SEND_MESSAGE:
        case types.RECEIVE_MESSAGE:
            return state.add(action.msg || {});

        default:
            return state;
    }
}