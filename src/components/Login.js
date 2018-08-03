import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginResult: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async login(event) {
        const {username, password} = this.state;
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const {message: loginResult} = await response.json();

        this.setState({loginResult});
    }

    render(props) {
        return (
            <div>
                <div>
                    <label htmlFor="username">
                        {'User Name:'}
                        <input
                            name="username"
                            onChange={this.handleChange}
                            type="text"
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        {'Password:'}
                        <input
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                        />
                    </label>
                </div>
                <div>
                    <input
                        onClick={this.login}
                        type="button"
                        value="Login"
                    />
                    <span>{this.state.loginResult}</span>
                </div>
            </div>
        );
    }
}
