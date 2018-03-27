/**
 * Created by azlar on 26/06/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import NotifyActions from '@c/actions/NotifyActions';

class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animationType: 'in'
        };
    }
    
    handleAnimationEnd = e => {
        if(e.animationName === 'bounceIn') {
            setTimeout(() => {
                this.setState({
                    animationType: 'out'
                });
            }, 1000);
        }

        if(e.animationName === 'bounceOut') {
            let { dispatch } = this.context,
                id = this.props.alert.id;

            dispatch(NotifyActions.clearAlert(id));
        }
    }

    render() {
        let { alert } = this.props;
        if(!alert) {
            return (
                <div className={ 'alert-box hiding'  } />
            );
        }

        let { id, type, msg } = alert;
        type = type ? type : 'info';
        msg = msg ? msg : null;

        return (
            <div
                className={ 'alert-box ' + this.state.animationType }
                onAnimationEnd={ this.handleAnimationEnd }
            >
                <div className='msg'>
                    { msg }
                </div>
            </div>
        );
    }
}

Alert.displayName = 'Alert';

Alert.contextTypes = {
    dispatch: PropTypes.func
};

export default Alert;