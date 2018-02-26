import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrderedSet } from "immutable";

import { uuid } from '@/util';
import MessageBox from './MessageBox';

import MsgActions from '@/actions/MsgActions';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msgs: props.msgs || OrderedSet()
        };
    }

    getChildContext() {
        return {
            dispatch: this.props.dispatch
        };
    }

    handleClick = (e) => {
        let { dispatch } = this.props;
        let text = this.refs.msgInput.value;
        
        if(text) {
            dispatch(MsgActions.send(text));
        }
    }

    render() {
        let { msgs } = this.props;
        return (
            <div className='chat-panel panel'>
                <section className='msgs'>
                    {
                        msgs.map(msg => 
                            <MessageBox key={ 'msg' + uuid() } msg={ msg } />
                        )
                    }
                </section>
                <section className='send-box'>
                    <input type='text' placeholder='type something...' ref='msgInput' />
                    <button onClick={ this.handleClick }>
                        Send
                    </button>
                </section>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const { msg } = state;
    
    return {
        msgs: msg
    };
};

Chat.childContextTypes = {
    dispatch: PropTypes.func
};

Chat.displayName = 'Chat';
Chat = connect(mapStateToProps)(Chat);

export default Chat;