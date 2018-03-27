/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Main
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
export const GET_LOCAL_DATA = 'GET_LOCAL_DATA'; // get config
export const SYS = {
    JOIN_ROOM: 'JOIN_ROOM',
    UPDATE_ROOM: 'UPDATE_ROOM',
    SET_USER_ID: 'SET_USER_ID'
};

export const NOTIFY = {
    SET_ALERT_MSG: 'SET_ALERT_MSG',
    CLEAR_ALERT: 'CLEAR_ALERT',
    SET_CONFIRM: 'SET_CONFIRM',
    CLEAR_CONFIRM: 'CLEAR_CONFIRM'
};

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * GAME
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
export const GAME = {
    I_M_READY: 'I_M_READY',
    UPDATE_READY_HANDS: 'UPDATE_READY_HANDS',
    START: 'START',   // receive cards count
    STARTED: 'STARTED',   // start aimation end,
    SET_TURN: 'SET_TURN',
    MY_TURN: 'MY_TURN',
    STUFFY: 'STUFFY',
    LOOK: 'LOOK',   // request server for the real card(need to support one by one)
    FOLLOW: 'FOLLOW',
    DROP: 'DROP'
};


/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Message module
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
export const MESSAGE = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE'
};
