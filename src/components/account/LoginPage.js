import React from 'react';
import {Jumbotron, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import StatusAlert from '../shared/StatusAlert';
import Main from '../shared/Main';

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
        this.setState({
            successRedirect: {
                url: '/page/account',
                title: 'account'
            },
            status: 'processing'
        });

        const status = await this.props.userInfo.login(creds);

        this.setState({
            status
        });
    }

    render = () => (
        <Main>
            <Row>
                <Col>
                    <h1>{'Log In'}</h1>
                    <LoginForm login={this.login} />
                    <StatusAlert
                        status={this.state.status}
                        successRedirect={this.state.successRedirect}
                    />
                </Col>
            </Row>
            <Row>
                <Col md="6">
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
                </Col>
                <Col md="6">
                    <Jumbotron>
                        <h3>{'Forgot your password?'}</h3>
                        <p>
                            {'Perhaps you\'d like to '}
                            <Link to="/page/reset-password">
                                {'reset your password'}
                            </Link>
                            {'.'}
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Main>
    )
}

LoginPage.propTypes = {
    userInfo: PropTypes.shape({
        login: PropTypes.func,
        logout: PropTypes.func
    })
};

export default withUser(LoginPage);
