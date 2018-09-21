import React from 'react';
import PropTypes from 'prop-types';

import fetchWrapper from '../util/fetch-wrapper';

const UserContext = React.createContext();

class UserContextManager extends React.Component {
    constructor(props) {
        super(props);
        this.resolveGetUser = [];
        this.state = {
            user: {}
        };
    }

    componentDidMount = async () => {
        const rawResponse = await fetchWrapper('/api/auth/user');

        this.processResult(rawResponse);
    }

    login = async (credentials) => {
        const rawResponse = await fetchWrapper('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: credentials
        });

        return this.processResult(rawResponse);
    }

    logout = async () => {
        const rawResponse = await fetchWrapper('/api/auth/logout', {
            method: 'POST'
        });

        return this.processResult(rawResponse);
    }

    processResult = ({user = {}, message, ok}) => {
        if (user.id) {
            this.resolveGetUser.forEach((r) => r(user));
        }

        this.setState({
            user
        });

        return {
            ok,
            message
        };
    }

    getUser = () => {
        if (this.state.user.id) {
            return Promise.resolve(this.state.user);
        }

        return new Promise((r) => this.resolveGetUser.push(r));
    }

    render = () => (
        <UserContext.Provider
            value={{
                user: this.state.user,
                login: this.login,
                logout: this.logout,
                isLoggedIn: Boolean(this.state.user.id),
                getUser: this.getUser
            }}
        >
            {this.props.children}
        </UserContext.Provider>

    )
}

UserContextManager.propTypes = {
    children: PropTypes.node
};

export default UserContextManager;

export const withUser = (WrappedComponent) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const WithUser = (props) => (
        <UserContext.Consumer>
            {(cxt) =>
                <WrappedComponent
                    {...props}
                    userInfo={cxt}
                />
            }
        </UserContext.Consumer>
    );

    WithUser.displayName = `WithUser(${displayName})`;

    return WithUser;
};
