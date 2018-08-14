import React from 'react';
import {Jumbotron, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Processing from '../shared/Processing';
import Page from '../shared/Page';

import {withUser} from './UserContext';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
        const status = await this.props.userInfo.logout();

        this.setState({
            status
        });
    }

    login = async (creds) => {
        const status = await this.props.userInfo.login(creds);

        this.setState({
            status
        });
    }

    getAlert = () => {
        if (!this.state.status) {
            return <Processing message="Looking up session status..." />;
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
            <h1>{'Log In'}</h1>
            <LoginForm login={this.login} />
            {this.getAlert()}
            <Jumbotron>
                <h3>{'Don\'t have an account?'}</h3>
                <p>
                    {'Please feel free to '}
                    <Link to="/page/sign-up">
                        {'sign up'}
                    </Link>
                    {'.'}
                </p>
            </Jumbotron>
        </Page>
    )
}

LoginPage.propTypes = {
    userInfo: PropTypes.shape({
        login: PropTypes.func,
        logout: PropTypes.func
    })
};

export default withUser(LoginPage);
