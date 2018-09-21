import React from 'react';
import queryString from 'query-string';
import {Form} from 'reactstrap';

import Page from '../shared/Page';
import changePassword from '../services/change-password';
import StatusAlert from '../shared/alerts/StatusAlert';
import AlertWithRedirect from '../shared/alerts/AlertWithRedirect';
import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    handleChange = (event) =>
        this.setState({[event.target.name]: event.target.value});

    changePassword = async (event) => {
        event.preventDefault();
        this.setState({
            status: 'processing'
        });

        const {location: {search}} = this.props;

        const {nonce} = queryString.parse(search);

        const {password} = this.state;

        const status = await changePassword({
            nonce,
            password
        });

        this.setState({
            status
        });
    }

    onSuccess = () =>
        <AlertWithRedirect
            text="login"
            url="/page/login"
        >
            {'Password Changed!'}
        </AlertWithRedirect>;

    passwordValid = () => this.state.password
        && this.state.password.length >= 5;

    passwordVerifyValid = () => this.state.passwordVerify === this.state.password;

    render = () => (
        <Page>
            <h1>{'Change Password'}</h1>
            <Form onSubmit={this.changePassword}>
                <RequiredInput
                    changeHandler={this.handleChange}
                    helpText="Minimum length five characters."
                    invalidFeedback="Password requirements are not met."
                    label="New Password"
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
                        !this.passwordValid() ||
                        !this.passwordVerifyValid()
                    }
                />
            </Form>
            <StatusAlert
                status={this.state.status}
                success={this.onSuccess()}
            />
        </Page>
    )
}

export default ChangePasswordPage;
