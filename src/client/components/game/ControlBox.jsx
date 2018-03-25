import React from 'react';
import PropTypes from 'prop-types';

class ControlBox extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className='control-box'>
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

ControlBox.contextTypes = {
    rootState: PropTypes.object,
    dispatch: PropTypes.func
};

export default ControlBox;