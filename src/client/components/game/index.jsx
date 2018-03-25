import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uuid } from '@c/util';

import GameActions from '@c/actions/GameActions';
import MapActions from '@c/components/test/MapActions';
import * as EVENTS from '@c/const/SocketEvents';
import GAME_STATUS from '@c/const/GameStatus';


import CardBox from './CardBox';
import ControlBox from './ControlBox';

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
                    
                    <CardBox index={ 3 } self={ true } />
                    <ControlBox />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { game } = state;
    
    return {
        status: game.get('status'),
        readyUsers: game.get('readyUsers')
    };
};

GamePanel.propTypes = {
    status: PropTypes.number
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