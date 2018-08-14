import React from 'react';
import {FormGroup, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';

const FormSubmit = (props) => {
    const {
        label,
        disabled,
        color
    } = props;

    return (
        <FormGroup row>
            <Col
                sm={{
                    size: 10,
                    offset: 2
                }}
            >
                <Button
                    color={color}
                    disabled={disabled}
                >{label}
                </Button>
            </Col>
        </FormGroup>
    );
};

FormSubmit.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string
};

FormSubmit.defaultProps = {
    color: 'primary',
    disabled: false,
    label: 'Submit'
};

export default FormSubmit;
