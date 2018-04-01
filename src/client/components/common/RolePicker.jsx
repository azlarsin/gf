import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';

import roles from '@c/const/Roles';

class RolePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false,
            index: null,
            
        };
    }

    handleAnimate = (animateState, index = null, delay = 0) => {
        setTimeout(() => {
            this.setState({
                animate: animateState,
                index: index
            });
        }, delay);
    }
    
    render() {
        
        return (
            <div className='role-picker-panel'>
                <h2>pick your role</h2>
                {
                    roles.filter(role => !role.ignore).map((role, index) => 
                        <Motion 
                            key={ 'role-box-' + role.name }
                            style={{
                                imgY: spring(index === this.state.index && this.state.animate ? -9 : 0, presets.gentle),
                                imgScale: spring(index === this.state.index && this.state.animate ? 1.5 : 1, role.cost ? { ...presets.wobbly, damping: 3 } : presets.gentle), 
                                infoSize: spring(index === this.state.index && this.state.animate ? 0 : 100),
                            }}
                            onRest={ this.handleAnimateShadow }
                        >
                            {({ imgY, imgScale }) =>
                                <div 
                                    className={ 'role-box' + (role.cost ? ' gold' : '') }
                                    onMouseOver={ this.handleAnimate.bind(this, true, index) }
                                    onMouseLeave={ this.handleAnimate.bind(this, false, index === this.state.index ? this.state.index : index) }
                                    onClick={ this.props.pickHandler.bind(this, role.id) }
                                >
                                    <div 
                                        className='avatar'
                                        style={{
                                            borderRadius: 200,
                                            width: 100,
                                            height: 100,
                                            transform: `scale(${imgScale}) translateY(${imgY}px)`,
                                            backgroundImage: 'url(' + require(`@c/assets/static/images/roles/${role.img}`) + ')',
                                        }}
                                        draggable={ true }
                                    />
                                    
                                    <div 
                                        className='info'
                                        style={{
                                            width: 100,
                                            height: 100,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <p
                                            style={{
                                                borderBottom: '1px solid #eee'
                                            }}
                                        >
                                            { role.name }
                                        </p>
                                        <p 
                                            style={{
                                                transform: `scale(${imgScale + .1})`,
                                                color: (role.cost ? ' gold' : '')
                                            }}
                                        >
                                            <b>{ role.note }</b>
                                        </p>
                                        {
                                            role.cost ? 
                                                <p>price: { role.cost }</p>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            }
                        </Motion>
                    )
                }
            </div>

        );
    }
}

RolePicker.propTypes = {
    pickHandler: PropTypes.func
};

export default RolePicker;