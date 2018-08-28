import React from 'react';
import {Form} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

class RequestResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    requestReset = async (event) => {
        event.preventDefault();
        const {email} = this.state;

        await this.props.requestReset({
            email
        });
    }

    emailValid = () => this.state.email
        && isEmail(this.state.email);

    render = () => (
        <Form onSubmit={this.requestReset}>
            <RequiredInput
                changeHandler={this.handleChange}
                helpText="This field is not displayed to other users."
                invalidFeedback="Email is not valid."
                name="email"
                validator={this.emailValid}
                value={this.state.email}
            />
            <FormSubmit
                disabled={
                    !this.emailValid()
                }
            />
        </Form>
    )
}

RequestResetForm.propTypes = {
    requestReset: PropTypes.func
};

export default RequestResetForm;
