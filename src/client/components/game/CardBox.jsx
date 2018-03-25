import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, pre } from 'react-motion';

import { uuid } from '@c/util';

// import Cards from './components/Cards';
import Cards from './components/Cards_v2';
import GAME_STATUS from '@c/const/GameStatus';

class CardBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            end: false
        };
    }

    componentWillReceiveProps(props, context) {
        let { status } = context.rootState;

        if(this.state.end && GAME_STATUS.playing.indexOf(status) === -1) {
            this.setState({
                end: false
            });   
        }
    }

    getChildContext() {
        return {
            self: this.props.self
        };
    }


    handleMoveEnd = (x, y, index) => {
        let { status } = this.context.rootState;
        
        if(!this.state.end && GAME_STATUS.playing.indexOf(status) !== -1 &&
        (
            (index === 0 && y <= 25) || 
            (index === 3 && y >= 75) || 
            (index === 1 && x <= 25) || 
            (index === 2 && x >= 75)
        )) {
            setTimeout(() => {
                this.setState({
                    end: true
                });
            }, 200);
        }
    }
    
    render() {
        let { status } = this.context.rootState;
        let { index } = this.props;

        return (
            <Motion 
                style={{
                    y: spring(GAME_STATUS.playing.indexOf(status) !== -1 ? (index === 0 ? 20 : index === 3 ? 80 : 50) : 50, {stiffness: 120, damping: 14, precision: 1}), 
                    x: spring(GAME_STATUS.playing.indexOf(status) !== -1 ? (index === 1 ? 20 : index === 2 ? 80 : 50) : 50, {stiffness: 120, damping: 14, precision: 1}), 
                    translateX: -50,
                    translateY: -50
                }}
            >
                {({ x, y, translateX, translateY }) =>
                {
                    // controll animate bt x & index, this is better than guessing the duration
                    // if(!this.state.end && (x <= 25 || x >= 75 || y <= 25 || y >= 75)) {
                    this.handleMoveEnd(x, y, index);
                    // }
                    return(
                        <div 
                            className='card-box' 
                            style={{ 
                                top: `${y}%` ,
                                left: `${x}%`,
                                transform: `translate(${translateX}%, ${translateY}%)`,
                                pointerEvents: GAME_STATUS.playing.indexOf(status) !== -1 && this.state.end ? 'auto' : 'none',
                                overflow: GAME_STATUS.playing.indexOf(status) !== -1 && this.state.end ? 'visible' : 'visible',
                            }}
                        >
                            <Cards 
                                open={ this.state.end } 
                                boxIndex={ index } 
                            />
                        </div>
                    );
                }   
                }
            </Motion>
        );
    }
}

CardBox.childContextTypes = {
    self: PropTypes.bool
};

CardBox.contextTypes = {
    rootState: PropTypes.object
};

CardBox.propTypes = {
    index: PropTypes.number
};

export default CardBox;