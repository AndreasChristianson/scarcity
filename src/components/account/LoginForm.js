import React from 'react';
import {Form} from 'reactstrap';
import PropTypes from 'prop-types';

import RequiredInput from '../shared/RequiredInput';
import FormSubmit from '../shared/FormSubmit';

import {withUser} from './UserContext';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = async (event) => {
        event.preventDefault();
        await this.props.login(this.state);
    }

    render = () => (
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
            <FormSubmit disabled={!(this.state.username && this.state.password)} />
        </Form>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func
};

export default withUser(LoginForm);
