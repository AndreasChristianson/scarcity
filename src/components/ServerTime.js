import React from 'react';
import {Client as NesClient} from 'nes';

export default class ServerTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'not-yet-fetched',
            subscription: 'not-yet-fetched',
            broadcast: 'not-yet-fetched',
            id: 'none',
            client: new NesClient(`ws://${window.location.host}`)
        };
        this.state.client.onUpdate = (update) =>
            this.setState({broadcast: update});
        this.connect = this.connect.bind(this);
    }

    async componentDidMount() {
        await this.connect();
    }

    async connect(e) {
        const auth = {
            headers: {
                Cookie: document.cookie
            }
        };

        await this.state.client.connect({auth});
        this.subscribe();
        this.fetchRouteData();
    }

    subscribe() {
        this.state.client.subscribe('/server/time', (update, flags) => {
            this.setState({
                subscription: update
            });
        });
        this.state.client.subscribe('/item/myid/info', (update, flags) => {
            this.setState({
                id: update
            });
        });
    }

    async fetchRouteData() {
        const {payload: time} = await this.state.client.request('server/time');

        this.setState({
            route: time
        });
    }

    render() {
        return (
            <ul>
                <input
                    onClick={this.connect}
                    type="button"
                    value="connect"
                />
                <li>{'Time via route: '}{this.state.route}</li>
                <li>{'Time via subscription: '}{this.state.subscription}</li>
                <li>{'Time via broadcast: '}{this.state.broadcast}</li>
                <li>{'Listening to `/item/{id}/info` for itemId `myid`: '}{this.state.id}</li>
            </ul>
        );
    }
}
