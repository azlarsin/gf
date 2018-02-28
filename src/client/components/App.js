import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '@c/components/msg/Chat';
import socket from '@c/socket';

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
    }

    componentWillMount() {
        socket.on('connect', () => {
            console.log(socket.id);
            
            // let a = socket.post("message", '123');
        });
    }

    getChildContext() {
        return {
            ipcRenderer: this.ipcRenderer || null,
            remote: this.remote || null,
            platform: this.platform,
            socket: this.socket
        };
    }

    render() {
        return (
            <div className='root'>
                <div className='body'></div>
                <Chat />
            </div>
        )
    }
}

App.childContextTypes = {
    // ipcRenderer: PropTypes.object,
    // remote: PropTypes.object,
    // platform: PropTypes.string,
    socket: PropTypes.object
};

export default connect()(App);