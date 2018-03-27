/**
 * Created by azlar on 27/06/2017.
 */

import * as types from '@c/const/ActionTypes';

const NOTIFY = types.NOTIFY;

export default {
    setAlert(msg) {
        return (dispatch, getState) => {

            let state = getState(),
                { alerts } = state.notifies;
    
            let has = false;
            alerts.find(alert => {
                has = alert && alert.msg === msg;
            });
    
            if(has)
                return ;
    
            dispatch({
                type: NOTIFY.SET_ALERT_MSG,
                msg
            });
        };
    },
    clearAlert(id) {
        return {
            type: NOTIFY.CLEAR_ALERT,
            id
        };
    },

    setConfirm(newConfirm) {
        return {
            type: NOTIFY.SET_CONFIRM,
            newConfirm
        };
    },

    clearConfirm() {
        return {
            type: NOTIFY.CLEAR_CONFIRM,
        };
    }
};