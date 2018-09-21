import React from 'react';
import {Jumbotron, Col, Row, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';

import StatusAlert from '../shared/alerts/StatusAlert';
import Main from '../shared/Main';
import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

import {withUser} from './UserContext';

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

    handleChange = (event) =>
        this.setState({[event.target.name]: event.target.value});

    login = async (event) => {
        event.preventDefault();
        this.setState({
            status: 'processing'
        });

        const {username, password} = this.state;
        const status = await this.props.userInfo.login({
            username,
            password
        });

        this.setState({
            status,
            onSuccess: <Redirect to="/page/account" />
        });
    }

    render = () => (
        <Main>
            <Row>
                <Col>
                    <h1>{'Log In'}</h1>
                    <Form onSubmit={this.login}>
                        <RequiredInput
                            changeHandler={this.handleChange}
                            name="username"
                            value={this.state.username}
                        />
                        <RequiredInput
                            changeHandler={this.handleChange}
                            name="password"
                            type={'password'}
                            value={this.state.password}
                        />
                        <FormSubmit disabled={!this.state.username || !this.state.password} />
                    </Form>
                    <StatusAlert
                        status={this.state.status}
                        success={this.state.onSuccess}
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
