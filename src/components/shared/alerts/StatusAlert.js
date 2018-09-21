import React from 'react';
import PropTypes from 'prop-types';

import Processing from './Processing';
import ErrorAlert from './ErrorAlert';
import ScarcityAlert from './ScarcityAlert';

class StatusAlert extends React.Component {
    success = () => this.props.success ||
        <ScarcityAlert color="success">
            {this.props.status.message}
        </ScarcityAlert>;

    error = () => this.props.error ||
        <ErrorAlert>
            {this.props.status.message}
        </ErrorAlert>;

    render = () => {
        const {status} = this.props;

        if (status === undefined) {
            return null;
        } else if (status === 'processing') {
            return <Processing />;
        } else if (status.ok) {
            return this.success();
        }

        return this.error();
    }
}

StatusAlert.propTypes = {
    status: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            message: PropTypes.string,
            ok: PropTypes.bool
        })
    ]),
    success: PropTypes.node,
    error: PropTypes.node
};

export default StatusAlert;
