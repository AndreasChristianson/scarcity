import React from 'react';
import {Alert} from 'reactstrap';

import Page from '../shared/Page';
import createUser from '../services/createUser';
import Processing from '../shared/Processing';

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

    getAlert = () => {
        if (!this.state.status) {
            return null;
        }

        if (this.state.status === 'processing') {
            return <Processing />;
        }

        const color = this.state.status.ok ?
            'success' :
            'danger';

        return (
            <Alert color={color}>
                {this.state.status.message}
            </Alert>
        );
    }

    render = () => (
        <Page>
            <h1>{'Sign Up'}</h1>
            <SignUpForm createUser={this.createUser} />
            {this.getAlert()}
        </Page>
    )
}

export default SignUpPage;
