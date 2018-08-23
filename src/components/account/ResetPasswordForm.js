import React from 'react';
import {Form} from 'reactstrap';
import PropTypes from 'prop-types';

import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    resetPassword = async (event) => {
        event.preventDefault();
        const {password} = this.state;

        await this.props.resetPassword(password);
    }

    passwordValid = () => this.state.password
        && this.state.password.length >= 5;

    passwordVerifyValid = () => this.state.passwordVerify === this.state.password;

    render = () => (
        <Form onSubmit={this.resetPassword}>
            <RequiredInput
                changeHandler={this.handleChange}
                helpText="Minimum length five characters."
                invalidFeedback="Password requirements are not met."
                name="password"
                type={'password'}
                validator={this.passwordValid}
                value={this.state.password}
            />
            <RequiredInput
                changeHandler={this.handleChange}
                invalidFeedback="Passwords do not match."
                label={'Verify password'}
                name="passwordVerify"
                type={'password'}
                validator={this.passwordVerifyValid}
                value={this.state.passwordVerify}
            />
            <FormSubmit
                disabled={
                    !(this.passwordValid() && this.passwordVerifyValid())
                }
            />
        </Form>
    )
}

ResetPasswordForm.propTypes = {
    resetPassword: PropTypes.func
};

export default ResetPasswordForm;
