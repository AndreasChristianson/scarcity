import React from 'react';
import {Container} from 'reactstrap';
import PropTypes from 'prop-types';

const Main = (props) => (
    <Container tag="main">
        {props.children}
    </Container>
);

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
