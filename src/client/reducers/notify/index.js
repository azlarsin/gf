/**
 * Created by azlar on 27/06/2017.
 */

import * as types from '@c/const/ActionTypes';
import { combineReducers } from 'redux';
import { uuid } from '@c/util';
import { OrderedMap } from 'immutable';


const alertsInitialState = OrderedMap();

const NOTIFY = types.NOTIFY;

let alerts = ( alerts = alertsInitialState, action ) => {
    switch (action.type) {
    case NOTIFY.SET_ALERT_MSG: {
        let newAlert = {
            id: 'alert-' + uuid(),
            msg: action.msg
        };

        return alerts.set(newAlert.id, newAlert);
    }

    case NOTIFY.CLEAR_ALERT: 
        return alerts.delete(action.id);

    default:
        return alerts;
    }
};

const confirmInitialState = null;

let confirm = ( confirm = confirmInitialState, action ) => {
    switch (action.type) {
    case NOTIFY.SET_CONFIRM: {
        return {
            ...action.newConfirm,
            id: 'confirm-' + uuid()
        };
    }
    
    case NOTIFY.CLEAR_CONFIRM:
        return null;

    default:
        return confirm;
    }
};

export default combineReducers({ alerts, confirm });