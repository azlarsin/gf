import { combineReducers } from 'redux';
import msg from './msg';
import sys from './sys';

const GF = combineReducers({
    msg,
    sys
});

export default GF;