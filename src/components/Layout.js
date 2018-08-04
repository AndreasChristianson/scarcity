import React from 'react';

import ServerTime from './ServerTime';
import Login from './Login';

const Layout = (props) => (
    <div className="box">
        <ServerTime />
        <Login />
    </div>
);

export default Layout;
