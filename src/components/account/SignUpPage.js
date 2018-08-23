import React from 'react';

import Page from '../shared/Page';
import createUser from '../services/createUser';
import StatusAlert from '../shared/StatusAlert';

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

    render = () => (
        <Page>
            <h1>{'Sign Up'}</h1>
            <SignUpForm createUser={this.createUser} />
            <StatusAlert
                status={this.state.status}
                successRedirect={{
                    url: '/page/login',
                    title: 'login'
                }}
            />
        </Page>
    )
}

export default SignUpPage;
