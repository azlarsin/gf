import React from 'react';
import PropTypes from 'prop-types';

import GameActions from '@c/actions/GameActions';
import MapActions from '@c/components/test/MapActions';

import Cards from './Cards';
// import Card from './Card';

class PokerPanel extends React.Component {
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

    render(){
        return (
            <div className='poker-panel'>


                <MapActions actions={ GameActions } />
            </div>
        );
    }
}

PokerPanel.contextTypes = {
    dispatch: PropTypes.func
};

/* {   
    this.state.no.map(no => <Card no={ no } key={ 'card-' + uuid() } />)
} */

export default PokerPanel;