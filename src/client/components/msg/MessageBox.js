import React from 'react';
import PropTypes from 'prop-types';
import { OrderedMap } from "immutable";

class MessageBox extends React.Component {
    render() {
        let { msg } = this.props;

        return (
            <figure className={ 'msg-box' + (msg.self && ' self') }>
                <div className='avatar'>
                    <img className="" src={ msg.userId } />
                </div>
                <div className='msg'>
                    { msg.text }
                </div>
            </figure>
        )
    }
}

export default MessageBox;