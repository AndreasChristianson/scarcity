import React from 'react';
import PropTypes from 'prop-types';

import Processing from './Processing';
import AlertWithRedirect from './AlertWithRedirect';
import ScarcityAlert from './ScarcityAlert';

const handleOk = (message, successRedirect) => {
    if (successRedirect) {
        return (
            <AlertWithRedirect
                color={'success'}
                message={message}
                redirect={successRedirect}
            />
        );
    }

    return (
        <ScarcityAlert
            color={'success'}
            message={message}
        />
    );
};
const StatusAlert = ({status, successRedirect}) => {
    if (status === undefined) {
        return null;
    } else if (status === 'processing') {
        return <Processing />;
    } else if (status.ok) {
        return handleOk(status.message, successRedirect);
    }

    return (
        <ScarcityAlert
            color={'danger'}
            message={status.message}
        />
    );
};

StatusAlert.propTypes = {
    status: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            message: PropTypes.string,
            ok: PropTypes.bool
        })
    ]),
    successRedirect: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string
    })
};

export default StatusAlert;
