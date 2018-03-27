import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uuid } from '@c/util';

import GameActions from '@c/actions/GameActions';
import MapActions from '@c/components/test/MapActions';
import * as EVENTS from '@c/const/SocketEvents';
import GAME_STATUS from '@c/const/GameStatus';

import StatusBar from '@c/components/common/StatusBar';

import CardBox from './CardBox';
import ControlPanel from './ControlPanel';

// import Card from './Card';

class GamePanel extends React.Component {
    constructor(props) {
        super(props);

        const suits = ['a', 'b', 'c', 'd'];
        const no = [];
        for(let i = 1;i <= 13;i++) {
            suits.map(v => no.push(v + i));
        }

        this.state = {
            no
        };
    }

    componentDidMount() {
        const { socket, dispatch } = this.context;
        const GAME_EVENTS = EVENTS.GAME;
        
        // bind events to socket
        socket.on(GAME_EVENTS.GAME_START, () => {
            dispatch(GameActions.start());            
        });

        socket.on(GAME_EVENTS.GAME_TURN, data => {
            let { userId } = data;
            
            dispatch(GameActions.setTurn(userId));
        });

        // socket.on(GAME_EVENTS.OPEN);

        console.log(this.props);
    }

    getChildContext() {
        return {
            rootState: this.props
        };
    }
    
    render(){
        const { readyUsers, status } = this.props;
        
        return (
            <div className='game-panel'>
                <MapActions actions={ GameActions } />

                
                <div className='box'>
                    {
                        new Array(3).fill(null).map((v, i) => <CardBox index={ i } key={ 'card-box-' + i } />)
                    }

                    <StatusBar />
                    <StatusBar />
                    <StatusBar />
                    <StatusBar />
                    
                    <CardBox index={ 3 } self={ true } />
                    
                    <ControlPanel />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { game, sys } = state;
    
    return {
        userId: sys.get('userId'),
        status: game.get('status'),
        readyUsers: game.get('readyUsers')
    };
};

GamePanel.propTypes = {
    status: PropTypes.number,
    userId: PropTypes.string  
};

GamePanel.contextTypes = {
    dispatch: PropTypes.func,
    socket: PropTypes.object
};

GamePanel.childContextTypes = {
    rootState: PropTypes.object
};


/* {   
    this.state.no.map(no => <Card no={ no } key={ 'card-' + uuid() } />)
} */

export default connect(mapStateToProps)(GamePanel);