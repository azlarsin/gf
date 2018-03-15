import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import GF from '@c/reducers';

const configureStore = () => {
    // const persistedState = loadState();

    const mws = [ promise, thunk, testMws ];

    // if(process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
        // predicate: (getState, action) => types.CACHE_HISTORY === action.type,
        duration: true
    });
        // mws.push( logger );
    // }

    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        GF,
        applyMiddleware(...mws)
        // composeEnhancers(applyMiddleware(...mws)),
    );
};

const testMws = store => next => action => {
    let result = next(action);
    let state = store.getState();
    console.log('here');
    return result;
};

export default configureStore;