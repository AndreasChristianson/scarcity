import React from 'react';
import {Form} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';

import Page from '../shared/Page';
import requestReset from '../services/request-password-reset';
import StatusAlert from '../shared/alerts/StatusAlert';
import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange = (event) =>
        this.setState({[event.target.name]: event.target.value});

    requestReset = async (event) => {
        event.preventDefault();
        this.setState({
            status: 'processing'
        });

        const {email} = this.state;
        const status = await requestReset({email});

        this.setState({
            status
        });
    }

    emailValid = () => this.state.email
        && isEmail(this.state.email);

    render = () => (
        <Page>
            <h1>{'Reset Password'}</h1>
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
            <StatusAlert
                status={this.state.status}
            />
        </Page>
    )
}

export default SignUpPage;
