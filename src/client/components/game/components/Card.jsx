import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring, presets } from 'react-motion';

import GAME_STATUS from '@c/const/GameStatus';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false,
            rotate: false,
            newNo: props.no
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let { status } = nextContext.rootState;
        let { self } = nextContext;
        let { no } = nextProps;

        // console.log(self, this.state.rotate, this.state.newNo);
        // drop animation
        if(self && [GAME_STATUS.drop, GAME_STATUS.watching].indexOf(status) !== -1 && this.state.rotate && this.state.newNo) {
            this.handleClick();
        }
        
        // open self
        if(!this.state.newNo && no) {
            this.handleClick(no);
        }
    }

    handleClick = (no = null, e = null) => {
        e && e.preventDefault();

        if(this.state.rotate) {
            if(this.state.newNo) {
                
                this.setState({
                    rotate: false,
                    newNo: null
                });
            }else {
                return;
            }
        }else {
            this.setState({
                rotate: true,
            }, () => {
                // todo: get card from server
                setTimeout(() => {
                    this.setState({
                        newNo: no
                    });
                }, 500);
            }); 
        }
    }

    handleAnimate = (animateState, delay = 0) => {
        setTimeout(() => {
            this.setState({
                animate: animateState
            });
        }, delay);
    }

    render(){
        const no = this.state.newNo;
        const index = Math.abs(this.props.index - 2);
        let { status } = this.context.rootState;
        let { self } = this.context;

        return (
            <Motion style={{
                rotate: spring(this.state.rotate ? -720 : 0, {stiffness: 120, damping: 14}), 
                translateX: spring(no ? index * 25 : (this.state.animate ? 20: 0)),
                scale: spring(no ? 1 : (this.state.rotate ? 1.2 : 1), presets.gentle),
                rotateX: spring(no ? 0 : (this.state.animate ? 0: 0)),
                rotateY: spring(no ? 3 : (this.state.animate ? 15: 0), presets.wobbly),
                gray: spring(self && [GAME_STATUS.dop, GAME_STATUS.watching].indexOf(status) !== -1 ? 100 : 0, {stiffness: 50, damping: 20})
            }}
            >
                {({rotate, translateX, scale, gray, rotateX, rotateY}) =>
                    <div 
                        className={ 'card' + (no ? (' ' + no) : '') + (self ? ' self' : '') }
                        onDoubleClick={ self ? this.handleClick.bind(this, no) : null }
                        onMouseOver={ this.handleAnimate.bind(this, true) }
                        onMouseLeave={ this.handleAnimate.bind(this, false, 500) }
                        draggable={ true }
                        style={{
                            transform: `rotate(${rotate}deg) translate3d(${-translateX}px, 0, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                            filter: `grayscale(${gray}%)`
                        }}
                    />
                }
            </Motion>
        );
    }
}

Card.contextTypes = {
    rootState: PropTypes.object,
    self: PropTypes.bool
};

Card.propTypes = {
    no: PropTypes.string,
    index: PropTypes.number
};

export default Card;