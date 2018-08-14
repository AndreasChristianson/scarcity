import React from 'react';
import {Form} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleNameChange = (event) => {
        const input = event.target.value;
        const sanitized = input.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

        this.setState({name: sanitized});
    }

    login = async (event) => {
        event.preventDefault();
        const {name, password, email} = this.state;

        await this.props.createUser({
            name,
            password,
            email
        });
    }

    nameValid = () => this.state.name
        && this.state.name.length >= 5
        && this.state.name.length <= 30;

    passwordValid = () => this.state.password
        && this.state.password.length >= 5;

    emailValid = () => this.state.email
        && isEmail(this.state.email);

    passwordVerifyValid = () => this.state.passwordVerify === this.state.password;

    render = () => (
        <Form onSubmit={this.login}>
            <RequiredInput
                changeHandler={this.handleNameChange}
                helpText="A public name you will log in as. Other users will see this name. Underscores are allowed; no other punctuation or spaces. Length bound: [5, 30]."
                invalidFeedback="Name requirements are not met."
                name="name"
                size="lg"
                validator={this.nameValid}
                value={this.state.name}
            />
            <RequiredInput
                changeHandler={this.handleChange}
                helpText="This field is not displayed to other users."
                invalidFeedback="Email is not valid."
                name="email"
                validator={this.emailValid}
                value={this.state.email}
            />
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
                    !(this.nameValid()
                    && this.emailValid()
                    && this.passwordValid()
                    && this.passwordVerifyValid())
                }
            />
        </Form>
    )
}

LoginForm.propTypes = {
    createUser: PropTypes.func
};

export default LoginForm;
