import React from 'react';
import PropTypes from 'prop-types';

import GameActions from '@c/actions/GameActions';
import GAME_STATUS from '@c/const/GameStatus';

class ControlPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        let { gameSysInfo } = context.rootState;
        
        this.state = {
            stake: gameSysInfo.get('stake')
        };
    }

    componentWillReceiveProps(props, context) {
        let { status, gameSysInfo } = context.rootState;
        
        // init with sys.stake
        if(gameSysInfo.get('stake') !== this.state.stake) {
            this.setState({
                stake: gameSysInfo.get('stake')
            });
        }
    }

    handleClick = (type) => {
        let { dispatch } = this.context;
        
        switch(type){
        case 'ready':
            dispatch(GameActions.ready());
            break;
        
        case 'stuffy':
            dispatch(GameActions.stuffy(this.state.stake));
            break;

        case 'look':
            dispatch(GameActions.look());
            break;
        
        case 'follow':
            dispatch(GameActions.follow(this.state.stake));
            break;

        case 'drop':
            dispatch(GameActions.drop());
            break;
        }
    }

    handleStakeChange = e => {
        let min = e.target.min;
        let max = e.target.max;
        
        this.setState({
            stake: Math.min(max, Math.max(min, e.target.value))
        });
    }

    render() {
        let { status, myInfo, gameSysInfo } = this.context.rootState;

        let min = gameSysInfo.get('stake');
        let max = gameSysInfo.get('max');
        let money = myInfo ? myInfo.money : 0;
        max = Math.min(max, money);
        
        console.log(min, this.state.stake);

        if(GAME_STATUS.playing.indexOf(status) === -1) {
            return (
                <div className='control-panel'>
                    <button onClick={ this.handleClick.bind(this, 'ready') }>
                        准备
                    </button>
                </div>
            );
        }
        return (
            <div className='control-panel gaming'>
                <div className='fund'>
                    <input
                        type='range'
                        value={ this.state.stake }
                        onChange={ this.handleStakeChange }
                        min={ min }
                        max={ max }
                        step={ min }
                        style={{ backgroundImage: '-webkit-linear-gradient(left, #000 ' + (this.state.stake - min) * 100 / (max - min) + '%, #fff 0%)' }}
                    />
                    
                    <input
                        type='number'
                        value={ this.state.stake }
                        onChange={ this.handleStakeChange }
                        onKeyDown={ this.handleStakeChange }
                        step={ min }
                        min={ min }
                        max={ max }
                    />
                    
                </div>
                <div className='actions'>
                    <button onClick={ this.handleClick.bind(this, 'stuffy') }>
                        闷
                    </button>
                    <button onClick={ this.handleClick.bind(this, 'look') }>
                        看
                    </button>
                    <button onClick={ this.handleClick.bind(this, 'follow') }>
                        刚
                    </button>
                    <button onClick={ this.handleClick.bind(this, 'drop') }>
                        怂
                    </button>
                </div>
            </div>
        );
    }
}

ControlPanel.contextTypes = {
    rootState: PropTypes.object,
    dispatch: PropTypes.func
};

export default ControlPanel;