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
    UPDATE_ROOM: 'UPDATE_ROOM'
};

/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Play
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
export const PLAY = {
    I_M_READY: 'I_M_READY',
    UPDATE_READY_HANDS: 'UPDATE_READY_HANDS',
    MY_TURN: 'MY_TURN',
    RECEIVE_CARD: 'RECEIVE_CARD',   // receive cards count
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
