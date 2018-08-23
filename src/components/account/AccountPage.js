import React from 'react';
import {Table, Row, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Main from '../shared/Main';

import {withUser} from './UserContext';

const AccountPage = (props) => {
    const rows = Object.keys(props.userInfo.user)
        .map((key) =>
            <tr key={key}>
                <td>{key}</td>
                <td>{props.userInfo.user[key]}</td>
            </tr>
        );

    return (
        <Main>
            <Row>
                <Col>
                    <h1>{`Account: ${props.userInfo.user}`}</h1>
                </Col>
            </Row>
            <Row>
                <Col md="2">
                    <Button
                        outline
                        tag={Link}
                        to="/page/reset-password"
                    >{'Change Password'}
                    </Button>

                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>{'Attributes'}</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>{'Attribute'}</th>
                                <th>{'Value'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row />
        </Main>
    );
};

AccountPage.propTypes = {
    userInfo: PropTypes.shape({
        user: PropTypes.object
    })
};

export default withUser(AccountPage);
