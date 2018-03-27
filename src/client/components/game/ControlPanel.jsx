import React from 'react';
import PropTypes from 'prop-types';

import GameActions from '@c/actions/GameActions';
import GAME_STATUS from '@c/const/GameStatus';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        let { status } = this.context.rootState;
        
        if(GAME_STATUS.playing.indexOf(status) === -1) {
            return (
                <div className='control-panel'>
                    <button>
                        准备
                    </button>
                </div>
            );
        }
        return (
            <div className='control-panel gaming'>
                <button>
                    闷
                </button>
                <button>
                    看
                </button>
                <button>
                    刚
                </button>
                <button>
                    怂
                </button>
            </div>
        );
    }
}

ControlPanel.contextTypes = {
    rootState: PropTypes.object,
    dispatch: PropTypes.func
};

export default ControlPanel;