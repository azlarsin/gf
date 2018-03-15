import React from 'react';
import PropTypes from 'prop-types';

const MessageBox = props => {
    let { msg } = props;
    return (
        <div>
            <figure className={ 'msg-box' + (msg.self === true ? ' self' : '') }>
                <div className='avatar'>
                    <img className="" src={ require('@c/assets/static/images/ace.gif') } />
                </div>
                <div className='msg'>
                    <div className='info'>
                        { 'azlar 20:00'}
                    </div>
                    <div className='text'>
                        <span>
                            { msg.text }
                        </span>
                    </div>
                </div>
            </figure>
        </div>
    );
};

MessageBox.propTypes = {
    msg: PropTypes.object
};

export default MessageBox;