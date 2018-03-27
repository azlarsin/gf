import { combineReducers } from 'redux';

import msg from './msg';
import sys from './sys';
import game from './game';
import notify from './notify';

const GF = combineReducers({
    msg,
    sys,
    game,
    notifies: notify
});

export default GF;