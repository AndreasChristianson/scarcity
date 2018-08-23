import React from 'react';
import queryString from 'query-string';

import Page from '../shared/Page';
import resetPassword from '../services/reset-password';
import StatusAlert from '../shared/StatusAlert';

import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    resetPassword = async (password) => {
        this.setState({
            status: 'processing'
        });

        const {location: {search}} = this.props;

        const {nonce, id} = queryString.parse(search);

        const status = await resetPassword({
            nonce,
            password,
            id
        });

        this.setState({
            status
        });
    }

    render = () => (
        <Page>
            <h1>{'Change Password'}</h1>
            <ResetPasswordForm resetPassword={this.resetPassword} />
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

export default ResetPasswordPage;
