import * as types from "@c/const/ActionTypes";
import socket from '@c/socket';

export default {
    send(text = null) {
        return (dispatch, getState) => {

            let state = getState();
            
            let msg = {
                userId: 1,
                text: text
            };

            socket.post('message', { path: 'send', data: {...msg} }, data => {
                dispatch({
                    type: types.SEND_MESSAGE,
                    msg: {
                        ...msg,
                        self: msg.userId === 1
                    }
                });
            });
        }
    },

    receive(data = {}) {
        return {
            type: types.RECEIVE_MESSAGE,
            msg: {
                ...data
            }
        }
    }
}
