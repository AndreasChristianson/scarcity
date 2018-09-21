import React from 'react';
import PropTypes from 'prop-types';

import ScarcityAlert from './ScarcityAlert';

const Processing = ({children, ...props}) =>
    <ScarcityAlert
        color="dark"
        {...props}
    >
        {children}
    </ScarcityAlert>;

Processing.propTypes = {
    children: PropTypes.node
};

Processing.defaultProps = {
    children: 'Processing...'
};

export default Processing;
