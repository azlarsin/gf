
import React from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@c/util';

class MapActions extends React.Component{
    constructor(props) {
        super(props);
    }

    handleClick = action => {
        let { dispatch } = this.props;
        if(!dispatch) {
            dispatch = this.context.dispatch;
        }
        
        dispatch(action());
    }

    render() {
        let { dispatch, actions } = this.props;
        if(!dispatch) {
            dispatch = this.context.dispatch;
        }

        return (
            <div>
                {
                    Object.keys(actions).map(actionName => 
                        <button 
                            key={ 'action-' + uuid() } 
                            onClick={ this.handleClick.bind(this, actions[actionName]) }>
                            { actionName }
                        </button>
                    )
                }
            </div>
        );
    }
}

MapActions.propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.object
};

MapActions.contextTypes = {
    dispatch: PropTypes.func
};

export default MapActions;