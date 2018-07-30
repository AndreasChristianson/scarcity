import React from 'react';
import {Client as NesClient} from 'nes';

export default class Layout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        test: '',
        client: new NesClient(`ws://${window.location.host}`)
      };
    }

    async componentDidMount() {
      await this.state.client.connect();
      const {payload: test} = await this.state.client.request('test');
      this.setState({
        test
      });
    }

    render () {
        return (
            <div>
              {'State: '}{this.state.test}
            </div>
        );
    }
}
