import React from 'react';
import PropTypes from 'prop-types';

import ScarcityAlert from './ScarcityAlert';

const ErrorAlert = ({children, ...props}) => (
    <ScarcityAlert
        color="danger"
        {...props}
    >
        {children}
    </ScarcityAlert>
);

ErrorAlert.propTypes = {
    children: PropTypes.node
};

ErrorAlert.defaultProps = {
    children: 'Error.'
};

export default ErrorAlert;
