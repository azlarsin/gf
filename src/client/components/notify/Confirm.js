/**
 * Created by azlar on 26/06/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import NotifyActions from '@c/actions/NotifyActions';

class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            animationType: 'in',
            cb: null
        };
    }

    handleClick(cb, e) {
        this.setState({
            animationType: 'out',
            cb: cb
        });
    }

    handleAnimationEnd(e) {
        // if(e.animationName === 'bounceIn') {
        // }

        if(e.animationName === 'bounceOut') {
            let { dispatch } = this.context;
            // let id = this.props.confirm.id;

            if(typeof this.state.cb === 'function') {
                this.state.cb();
            }

            dispatch(NotifyActions.clearConfirm());
        }
    }

    render() {
        let { confirm } = this.props;

        if(!confirm) {
            return null;
        }

        let { id, title, msg, ok, cancel, okName, cancelName  } = confirm;

        return (
            <div
                className='confirm'
                onClick={ this.handleClick.bind(this, cancel) }
            >
                <div
                    className={ 'confirm-box ' + this.state.animationType }
                    onAnimationEnd={ this.handleAnimationEnd }
                    onClick={ e => e.stopPropagation() }
                >
                    <div className='title'>
                        { title }
                    </div>
                    <div className='body'>
                        { msg }
                    </div>

                    <div className='footer'>
                        <div
                            className='ok'
                            onClick={ this.handleClick.bind(this, ok) }
                        >
                            { okName }
                        </div>

                        <div
                            className='cancel'
                            onClick={ this.handleClick.bind(this, cancel) }
                        >
                            { cancelName }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Confirm.displayName = 'Confirm';

Confirm.contextTypes = {
    dispatch: PropTypes.func
};

export default Confirm;