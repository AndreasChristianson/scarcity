import React from 'react';
import {Client as NesClient} from 'nes';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'not-yet-fetched',
            subscription: 'not-yet-fetched',
            broadcast: 'not-yet-fetched',
            client: new NesClient(`ws://${window.location.host}`)
        };
        this.state.client.onUpdate = (update) =>
            this.setState({broadcast: update});
    }

    async componentDidMount() {
        await this.state.client.connect();
        this.subscribe();
        this.fetchRouteData();
    }

    subscribe() {
        this.state.client.subscribe('/server/time', (update, flags) => {
            this.setState({
                subscription: update
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
                <li>{'Time via route: '}{this.state.route}</li>
                <li>{'Time via subscription: '}{this.state.subscription}</li>
                <li>{'Time via broadcast: '}{this.state.broadcast}</li>
            </ul>
        );
    }
}
