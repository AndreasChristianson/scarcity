import React from 'react';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';

import Main from './Main';

const Page = (props) => (
    <Main>
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    </Main>
);

Page.propTypes = {
    children: PropTypes.node
};

export default Page;
