import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring, presets } from 'react-motion';

const POKER_IMAGE = require('@c/assets/static/images/poker.png');

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false,
            rotate: false,
            newNo: props.no
        };
    }

    handleClick = (no, e) => {
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
                setTimeout(() => {
                    this.setState({
                        newNo: 'd1'
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

        return (
            <div 
                className={ 'card-wrap' + (no ? '' : ' bg') }
                onDoubleClick={ this.handleClick.bind(this, no) }
                draggable={true}
                onMouseOver={ this.handleAnimate.bind(this, true) }
                onMouseLeave={ this.handleAnimate.bind(this, false, 500) }
            >
                <Motion style={{
                    x: spring(this.state.rotate ? -720 : 0, {stiffness: 120, damping: 14}), 
                    y: spring(no ? index * 25 : (this.state.animate ? 20: 0)),
                    z: spring(no ? 1 : (this.state.rotate ? 1.2 : 1), presets.gentle)
                }}
                >
                    {({x, y, z}) =>
                        <div 
                            className={ 'card' + (no ? (' ' + no) : '') }
                            style={{
                                transform: `rotate(${x}deg) translate3d(${y}px, 0, 0) scale(${z})`,
                            }}
                        />
                    }
                </Motion>
            </div>
        );
    }
}

Card.propTypes = {
    no: PropTypes.string,
    index: PropTypes.number
};

export default Card;