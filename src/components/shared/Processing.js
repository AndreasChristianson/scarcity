import React from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

const Processing = (props) => <Alert color="dark">{props.message}</Alert>;

Processing.propTypes = {
    message: PropTypes.string
};
Processing.defaultProps = {
    message: 'Processing...'
};

export default Processing;
