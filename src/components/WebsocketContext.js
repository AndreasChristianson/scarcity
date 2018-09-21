import React from 'react';
import PropTypes from 'prop-types';
import {Client as NesClient} from 'nes';

import {withUser} from './account/UserContext';
import Cancelable from './util/Cancelable';

const WebsocketContext = React.createContext();

class WesocketContextManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            websocket: new NesClient(`ws://${window.location.host}`),
            status: 'disconnected'
        };
        this.wsPromise = new Promise((resolve) => {
            this.resolveGetWebsocket = resolve;
        });
    }

    componentDidMount = () => this.manageConnection();

    componentDidUpdate = () => this.manageConnection();

    manageConnection = async () => {
        if (this.shouldConnect()) {
            await this.connect();
        } else if (this.shouldDisconnect()) {
            await this.disconnect();
        }
    }

    shouldConnect = () => this.state.status === 'disconnected' && this.props.userInfo.isLoggedIn;

    shouldDisconnect = () => this.state.status === 'connected' && !this.props.userInfo.isLoggedIn;

    connect = async () => {
        const auth = {
            headers: {
                Cookie: document.cookie
            }
        };

        this.setState({
            status: 'connecting'
        });
        await this.state.websocket.connect({auth});
        this.setState({
            status: 'connected'
        });

        this.resolveGetWebsocket(this.state.websocket);
    }

    disconnect = async () => {
        this.setState({
            status: 'disconnecting'
        });
        this.wsPromise = new Promise((resolve) => {
            this.resolveGetWebsocket = resolve;
        });
        await this.state.websocket.disconnect();
        this.setState({
            status: 'disconnected'
        });
    }

    accessWebservice = (func) => new Cancelable(this.wsPromise, func);

    cancelableSubscription = (path, func) => new Cancelable(
        this.wsPromise,
        (ws) => ws.subscribe(path, func),
        (ws) => ws.unsubscribe(path, func),
    );

    render = () => (
        <WebsocketContext.Provider
            value={{
                accessWebservice: this.accessWebservice,
                cancelableSubscription: this.cancelableSubscription
            }}
        >
            {this.props.children}
        </WebsocketContext.Provider>

    )
}

WesocketContextManager.propTypes = {
    children: PropTypes.node,
    userInfo: PropTypes.shape({
        isLoggedIn: PropTypes.bool
    })
};

export default withUser(WesocketContextManager);

export const withWebsocket = (WrappedComponent) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const WithWebsocket = (props) => (
        <WebsocketContext.Consumer>
            {(value) =>
                <WrappedComponent
                    {...props}
                    accessWebservice={value.accessWebservice}
                    cancelableSubscription={value.cancelableSubscription}
                />
            }
        </WebsocketContext.Consumer>
    );

    WithWebsocket.displayName = `WithWebsocket(${displayName})`;

    return WithWebsocket;
};
