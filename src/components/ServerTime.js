import React from 'react';
import PropTypes from 'prop-types';

import {withWebsocket} from './WebsocketContext';

class ServerTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'not-yet-fetched',
            subscription: 'not-yet-fetched',
            id: 'none',
            cancelables: []
        };
    }

    componentWillMount = () => {
        const timeSubscription = this.props.cancelableSubscription(
            '/server/time',
            (update) => {
                this.setState({
                    subscription: update
                });
            }
        );

        const idSubscription = this.props.cancelableSubscription(
            '/item/myid/info',
            (update) => {
                this.setState({
                    id: update
                });
            }
        );

        const timeFetch = this.props.accessWebservice(async (ws) => {
            const {payload: time} = await ws.request('server/time');

            this.setState({
                route: time
            });
        });

        this.setState(({cancelables}) => ({cancelables: [
            ...cancelables,
            timeSubscription,
            idSubscription,
            timeFetch
        ]}));
    };

    componentWillUnmount = () => {
        this.state.cancelables.forEach((c) => c.cancel());
    }

    render = () => (
        <ul>
            <li>{'Time via route: '}{this.state.route}</li>
            <li>{'Time via subscription: '}{this.state.subscription}</li>
            <li>{'Listening to `/item/{id}/info` for itemId `myid`: '}{this.state.id}</li>
        </ul>
    );
}

ServerTime.propTypes = {
    cancelableSubscription: PropTypes.func,
    accessWebservice: PropTypes.func
};

export default withWebsocket(ServerTime);
