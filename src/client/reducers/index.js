import { combineReducers } from 'redux';

import msg from './msg';
import sys from './sys';
import game from './game';

const GF = combineReducers({
    msg,
    sys,
    game
});

export default GF;