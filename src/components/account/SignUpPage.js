import React from 'react';

import Page from '../shared/Page';
import createUser from '../services/create-user';
import StatusAlert from '../shared/alerts/StatusAlert';
import AlertWithRedirect from '../shared/alerts/AlertWithRedirect';

import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createUser = async (user) => {
        this.setState({
            status: 'processing'
        });

        const status = await createUser(user);

        this.setState({
            status
        });
    }

    onSuccess = () =>
        <AlertWithRedirect
            title="login"
            url="/page/login"
        >
            {'Account created!'}
        </AlertWithRedirect>

    render = () =>
        <Page>
            <h1>{'Sign Up'}</h1>
            <SignUpForm createUser={this.createUser} />
            <StatusAlert
                status={this.state.status}
                success={this.onSuccess()}
            />
        </Page>;
}

export default SignUpPage;
