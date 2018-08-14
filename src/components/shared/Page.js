import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import PropTypes from 'prop-types';

const Page = (props) => (
    <Container tag="main">
        <Row>
            <Col>
                {props.children}
            </Col>
        </Row>
    </Container>
);

Page.propTypes = {
    children: PropTypes.node
};

export default Page;
