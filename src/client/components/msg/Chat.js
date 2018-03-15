/* eslint react/prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OrderedSet } from 'immutable';

import { uuid } from '@c/util';
import MessageBox from './MessageBox';

import MsgActions from '@c/actions/MsgActions';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msgs: props.msgs || OrderedSet()
        };

        this.msgList;
        this.msgInput;
    }

    componentDidMount() {
        const { socket } = this.context;
        socket.on('msg', (data) => {
            const { dispatch } = this.props;

            dispatch(MsgActions.receive(data));            
        });
    }

    componentDidUpdate() {
        // todo, using this.dom.scrollIntoView in <MessageBox />
        
        this.scrollMsgToBottom();
    }

    getChildContext() {
        return {
            dispatch: this.props.dispatch
        };
    }

    handleClick = () => {
        let { dispatch } = this.props;
        let text = this.msgInput.value;
        
        if(text) {
            dispatch(MsgActions.send(text));
            this.msgInput.value = '';
        }
    }

    scrollMsgToBottom = () => {
        let msgList = this.msgList;
        msgList && msgList.scrollTo(0, msgList.scrollHeight);
    }

    render() {
        let { msgs } = this.props;
        return (
            <div className='chat-panel panel'>
                <div>
                    <section 
                        className='msgs' 
                        ref={ dom => this.msgList=dom }
                    >
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
                            ref={ dom => this.msgInput=dom }
                        />
                        <button onClick={ this.handleClick }>
                            Send
                        </button>
                    </section>
                </div>
            </div>  
        );
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

export default connect(mapStateToProps)(Chat);