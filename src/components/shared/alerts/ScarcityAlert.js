import React from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

const ScarcityAlert = ({color, children, subMessage}) => (
    <Alert color={color}>
        <div className="alert-heading">{children}</div>
        <div>{subMessage}</div>
    </Alert>
);

ScarcityAlert.propTypes = {
    children: PropTypes.node,
    subMessage: PropTypes.node,
    color: PropTypes.string
};

export default ScarcityAlert;
