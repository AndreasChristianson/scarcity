import React from 'react';

import Page from '../shared/Page';
import requestReset from '../services/request-password-reset';
import StatusAlert from '../shared/StatusAlert';

import RequestResetForm from './RequestResetForm';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    requestReset = async (user) => {
        this.setState({
            status: 'processing'
        });

        const status = await requestReset(user);

        this.setState({
            status
        });
    }

    render = () => (
        <Page>
            <h1>{'Reset Password'}</h1>
            <RequestResetForm requestReset={this.requestReset} />
            <StatusAlert
                status={this.state.status}
            />
        </Page>
    )
}

export default SignUpPage;
