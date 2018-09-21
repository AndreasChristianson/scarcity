import React from 'react';
import {FormGroup, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';

const FormSubmit = (props) =>
    <FormGroup row>
        <Col
            sm={{
                size: 10,
                offset: 2
            }}
        >
            <Button {...props}>
                {props.label}
            </Button>
        </Col>
    </FormGroup>;

FormSubmit.propTypes = {
    label: PropTypes.string
};

FormSubmit.defaultProps = {
    color: 'primary',
    label: 'Submit'
};

export default FormSubmit;
