/**
 * Created by azlar on 26/06/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from './Alert';
import Confirm from './Confirm';

class Notify extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {
            alerts, confirm
        } = this.props.notifies;


        // let alert = alerts.first();

        let alertsArray = Array.from(alerts.values());

        return (
            <span className='notify'>
                <div className='alerts'>
                    {
                        alertsArray.map(alert =>
                            <Alert
                                key={ 'notify-alert-' + alert.id }
                                alert={ alert }
                            />
                        )
                    }
                </div>

                {
                    confirm ?
                        <Confirm confirm={ confirm } key={ 'notify-confirm-' + confirm.id } />
                        :
                        null
                }

            </span>
        );
    }
}

const mapStateToProps = (state) => {
    const { notifies } = state;

    return {
        notifies
    };
};

Notify.displayName = 'Notify';

Notify.propTypes = {
    notifies: PropTypes.object
};

export default connect(mapStateToProps)(Notify);