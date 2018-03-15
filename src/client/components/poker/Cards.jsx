import React from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@c/util';

import Card from './Card';

class Cards extends React.Component {
    constructor(props) {
        super(props);

        const cards = props.cards || Array(3).fill({ no: null });
        
        this.state = {
            cards: cards
        };
    }

    openAll = () => {
        var dblClickEvent= document.createEvent('MouseEvents'); 
        dblClickEvent.initEvent ('dblclick', true, true); 

        Array.prototype.map.call(this.dom.querySelectorAll('.card-wrap.bg'), dom => dom.dispatchEvent(dblClickEvent));
    }

    render() {
        const cards = this.state.cards;

        return (
            <div 
                className='cards'
                ref = { d => this.dom = d }
            >
                {
                    cards.map((card, i) => 
                        <Card
                            no={ card.no } 
                            index={i} 
                            key={ 'my-card-' + uuid() } 
                        />)
                }

                <button onClick={ this.openAll }>
                    open
                </button>
            </div>
        );
    }
}

Cards.propTypes = {
    cards: PropTypes.array
};

export default Cards;