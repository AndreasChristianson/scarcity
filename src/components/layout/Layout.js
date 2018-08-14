import React from 'react';

import Routes from '../Routes';

import Header from './Header';

const Layout = (props) => (
    <React.Fragment>
        <Header />
        <Routes />
    </React.Fragment>
);

export default Layout;
