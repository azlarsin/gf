import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrderedSet } from "immutable";

import { uuid } from '@c/util';
import MessageBox from './MessageBox';

import MsgActions from '@c/actions/MsgActions';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msgs: props.msgs || OrderedSet()
        };
    }

    componentDidMount() {
        const { socket } = this.context;

        socket.on('msg', (data) => {
            const { dispatch } = this.props;

            dispatch(MsgActions.receive(data));

            this.scrollMsgToBottom();
        });
    }

    getChildContext() {
        return {
            dispatch: this.props.dispatch
        };
    }

    handleClick = e => {
        let { dispatch } = this.props;
        let text = this.refs.msgInput.value;
        
        if(text) {
            dispatch(MsgActions.send(text));
            this.refs.msgInput.value = '';
        }

        this.scrollMsgToBottom();
    }

    scrollMsgToBottom = () => {
        let msgList = this.refs.msgList;
        setTimeout(() => {
            msgList.scrollTo(0, msgList.scrollHeight);
        }, 0);
    }

    render() {
        let { msgs } = this.props;
        return (
            <div className='chat-panel panel'>
                <section className='msgs' ref='msgList'>
                    {
                        msgs.map(msg => 
                            <MessageBox key={ 'msg' + uuid() } msg={ msg } />
                        )
                    }
                </section>
                <section className='send-box'>
                    <textarea
                        type='text' 
                        placeholder='type something...' 
                        ref='msgInput' 
                        onKeyDown = { e => e.keyCode === 13 ? this.handleClick() : null }
                    />
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

Chat.contextTypes = {
    socket: PropTypes.object
};

Chat.childContextTypes = {
    dispatch: PropTypes.func
};

Chat.displayName = 'Chat';
Chat = connect(mapStateToProps)(Chat);

export default Chat;