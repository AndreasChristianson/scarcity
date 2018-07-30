import React from 'react';
import {
  Client as NesClient
} from 'nes';

export default class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        route: 'not-yet-fetched',
        subscription: 'not-yet-fetched',
        client: new NesClient(`ws://${window.location.host}`)
      };
    }
    async componentDidMount() {
      await this.state.client.connect();
      const {
        payload: time
      } = await this.state.client.request('server/time');
      this.setState({
        route: time
      });

      this.state.client.subscribe('/server/time', (update, flags) => {
        this.setState({
          subscription: update
        });
      });
    }

    render () {
        return (
            <ul>
              <li>{'Time via route: '}{this.state.route.toString()}</li>
              <li>{'Time via subscription: '}{this.state.subscription.toString()}</li>
            </ul>
        );
    }
}
