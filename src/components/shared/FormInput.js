import React from 'react';
import {FormGroup, Label, Input, Col, FormFeedback, FormText} from 'reactstrap';
import PropTypes from 'prop-types';

import capitalize from '../util/capitalize';

class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false
        };
    }

    changeHandler = (event) => {
        this.setState({
            touched: true
        });
        this.props.changeHandler(event);
    }

    render = () => {
        const {
            name,
            label = capitalize(name),
            invalidFeedback = `${label} is required.`,
            validator,
            value,
            valid = validator(value),
            type,
            helpText,
            size,
            id = name
        } = this.props;
        const invalid = this.state.touched
            && !valid;

        return (
            <FormGroup row>
                <Label
                    for={id}
                    size={size}
                    sm={2}
                >
                    {label}{':'}
                </Label>
                <Col sm={10}>
                    <Input
                        bsSize={size}
                        id={id}
                        invalid={invalid}
                        name={name}
                        onChange={this.changeHandler}
                        type={type}
                        value={value}
                    />
                    <FormFeedback>
                        {invalidFeedback}
                    </FormFeedback>
                    {
                        helpText ?
                            <FormText>{helpText}</FormText> :
                            null
                    }
                </Col>
            </FormGroup>
        );
    }
}

FormInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    invalidFeedback: PropTypes.string,
    validator: PropTypes.func,
    value: PropTypes.string,
    valid: PropTypes.bool,
    type: PropTypes.string,
    helpText: PropTypes.string,
    size: PropTypes.string,
    id: PropTypes.string,
    changeHandler: PropTypes.func
};

FormInput.defaultProps = {
    validator: () => true,
    value: '',
    type: 'text',
    size: 'na'
};

export default FormInput;
