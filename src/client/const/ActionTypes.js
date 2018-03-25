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
 * GAME
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
export const GAME = {
    I_M_READY: 'I_M_READY',
    UPDATE_READY_HANDS: 'UPDATE_READY_HANDS',
    START: 'START',   // receive cards count
    STARTED: 'STARTED',   // start aimation end
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
