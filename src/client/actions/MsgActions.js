import * as types from "@/const/ActionTypes";
import socket from '@/socket';

export default {
    send(text = null) {
        return async (dispatch, getState) => {

            let state = getState();
            
            let msg = {
                userId: 1,
                text: text
            };

            await socket.post('msg', msg, data => {
                console.log(data);
                
                dispatch({
                    type: types.SEND_MESSAGE,
                    msg
                });
            });
        }
    }
}
