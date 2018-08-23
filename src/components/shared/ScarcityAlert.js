import React from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

const ScarcityAlert = ({message, color, subMessage}) => (
    <Alert color={color}>
        <div className="alert-heading">{message}</div>
        <div>{subMessage}</div>
    </Alert>
);

ScarcityAlert.propTypes = {
    message: PropTypes.string,
    color: PropTypes.string,
    subMessage: PropTypes.node
};

export default ScarcityAlert;
