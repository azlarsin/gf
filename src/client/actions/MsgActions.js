import * as types from '@c/const/ActionTypes';
import socket from '@c/socket';

const MESSAGE = types.MESSAGE;
export default {
    send(text = null) {
        return (dispatch, getState) => {

            // let state = getState();
            // console.log(state);

            let msg = {
                userId: 1,
                text: text
            };

            socket.post('message', { path: 'send', data: {...msg} }, data => {
                dispatch({
                    type: MESSAGE.SEND_MESSAGE,
                    msg: {
                        ...msg,
                        self: msg.userId === 1
                    }
                });
            });
        };
    },

    receive(data = {}) {
        return {
            type: MESSAGE.RECEIVE_MESSAGE,
            msg: {
                ...data
            }
        };
    }
};
