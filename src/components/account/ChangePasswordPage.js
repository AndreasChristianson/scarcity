import React from 'react';
import queryString from 'query-string';

import Page from '../shared/Page';
import changePassword from '../services/change-password';
import StatusAlert from '../shared/StatusAlert';

import ChangePasswordForm from './ChangePasswordForm';

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    changePassword = async (password) => {
        this.setState({
            status: 'processing'
        });

        const {location: {search}} = this.props;

        const {nonce} = queryString.parse(search);

        const status = await changePassword({
            nonce,
            password
        });

        this.setState({
            status
        });
    }

    render = () => (
        <Page>
            <h1>{'Change Password'}</h1>
            <ChangePasswordForm changePassword={this.changePassword} />
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

export default ChangePasswordPage;
