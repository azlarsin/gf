import React from 'react';
import PropTypes from 'prop-types';
import { StaggeredMotion, Motion, spring, presets } from 'react-motion';

import GameActions from '@c/actions/GameActions';
import { uuid } from '@c/util';
import GAME_STATUS from '@c/const/GameStatus';

import Card from './Card';

class Cards extends React.Component {
    constructor(props) {
        super(props);

        const cards = props.cards || Array(3).fill({ no: null });
        
        this.state = {
            cards: cards,
        };

        this.defaultStye = {
            translateX: 0,
            translateY: 0
        };
    }

    openAll = () => {
        var dblClickEvent= document.createEvent('MouseEvents'); 
        dblClickEvent.initEvent ('dblclick', true, true); 

        Array.prototype.map.call(this.dom.querySelectorAll('.card-wrap.bg'), dom => dom.dispatchEvent(dblClickEvent));
    }

    getCardsStyle = (prevStyles) => {
        const { open } = this.props;
        
        const endValue = prevStyles.map((_, i) => {
            return i === 0 ?
                this.defaultStye
                :
                {
                    translateX: spring(open ? prevStyles[i - 1].translateX + 64 : this.defaultStye.translateX, {...presets.wobbly, precision: .1}),
                    translateY: spring(open ? prevStyles[i - 1].translateY + i * 2.5 / 3 : 0, {...presets.wobbly, precision: .0001}),
                };
            
        });
        return endValue;
    }

    render() {
        const cards = this.state.cards;
        const { open, boxIndex } = this.props;

        return (
            <StaggeredMotion
                defaultStyles={[
                    { ...this.defaultStye },
                    { ...this.defaultStye },
                    { ...this.defaultStye }
                ]}
                styles={ this.getCardsStyle }
            >
                {styles =>
                    <div 
                        className='cards_v2'
                        ref = { d => this.dom = d }
                    >
                        { styles.map(({ translateX, translateY }, i) => {
                            let card = cards[i];
                            // todo: setStarted at animation end (if need)
                            // if(!this.state.started && i === 2 && translateX === 128 && translateY === 2.5) {
                            //     this.setGameStatusStarted();
                            // }
                            return (
                                <div 
                                    className={ 'card-wrap' + (card.no ? '' : ' bg') }
                                    key={ `my-card-${boxIndex}-${i}` }
                                    style={{
                                        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
                                        zIndex: i
                                    }}
                                >
                                    <Card
                                        no={ card.no } 
                                        index={ i } 
                                    />
                                </div>
                            );
                        }
                        )}
                    </div>
                }
            </StaggeredMotion>
                                    
        );
    }
}

Cards.contextTypes = {
    self: PropTypes.bool,
    dispatch: PropTypes.func
};

Cards.propTypes = {
    cards: PropTypes.array,
    open: PropTypes.bool
};

export default Cards;