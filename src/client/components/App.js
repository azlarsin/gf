import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '@c/components/msg/Chat';
import GamePanel from '@c/components/game/';
import Notify from '@c/components/notify';
import socket from '@c/socket';

// import GameActions from '@c/actions/GameActions';
// import MapActions from '@c/components/test/MapActions';

import SysActions from '@c/actions/SysActions';
import RolePicker from '@c/components/common/RolePicker';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.platform = 'darwin';
        this.socket = socket;

        //set electrons
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {

            // let { dispatch } = this.props;

            //electron ipc
            // const { ipcRenderer, remote } = require('electron');
            // this.ipcRenderer = ipcRenderer;
            // this.remote = remote;

            // this.platform = process.platform;
        }

        this.state = {
            pickRole: false
        };
    }

    componentWillMount() {
        let userId = localStorage.getItem('user');
        
        if(!userId) {
            this.setState({
                pickRole: true
            });
        }else {
            socket.on('connect', () => {
                this.__bindSocket(userId);
            });
        }
    }

    handlePicker = (id) =>  {
        let userId = id;
        
        localStorage.setItem('user', userId);

        this.__bindSocket(userId);

        this.setState({
            pickRole: false
        });
    }

    __bindSocket = userId => {
        let { dispatch } = this.props;

        dispatch(SysActions.joinRoom(userId));
        dispatch(SysActions.setUserId(userId));
    }

    getChildContext() {
        return {
            // ipcRenderer: this.ipcRenderer || null,
            // remote: this.remote || null,
            // platform: this.platform,
            socket: this.socket,
            dispatch: this.props.dispatch
        };
    }

    render() {
        if(this.state.pickRole) {
            return (
                <div className='root'>
                    <RolePicker pickHandler={ this.handlePicker }/>
                </div>
            );
        }

        return (
            <div className='root'>
                <div className='body'>
                    <GamePanel />
                    <Notify />
                </div>
                <Chat />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { sys } = state;
    const userId = sys.get('userId');

    return {
        userId
    };
};

App.propTypes = {
    dispatch: PropTypes.func
};

App.childContextTypes = {
    // ipcRenderer: PropTypes.object,
    // remote: PropTypes.object,
    // platform: PropTypes.string,
    socket: PropTypes.object,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(App);