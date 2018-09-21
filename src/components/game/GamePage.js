import React from 'react';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Main from '../shared/Main';
import {withWebsocket} from '../WebsocketContext';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: props.match.params.id,
            cancelables: []
        };
    }

    componentWillMount = () => {
        const gameSubscription = this.props.cancelableSubscription(
            `/game/${this.state.gameId}`,
            (update) => {
                /*
                 * this.setState({
                 *     subscription: update
                 * });
                 */
            }
        );

        this.setState(({cancelables}) => ({cancelables: [
            ...cancelables,
            gameSubscription
        ]}));
    };

    componentWillUnmount = () => {
        this.state.cancelables.forEach((c) => c.cancel());
    }

    render = () => (
        <Main>
            <Row>
                <Col />
            </Row>
            <Row>
                <Col md="6" />
                <Col md="6" />
            </Row>
        </Main>
    )
}

GamePage.propTypes = {
    cancelableSubscription: PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

export default withWebsocket(GamePage);
