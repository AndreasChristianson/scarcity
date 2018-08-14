import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import UserContextManager from './account/UserContext';
import Layout from './layout/Layout';

ReactDOM.render(
    <BrowserRouter>
        <UserContextManager>
            <Layout />
        </UserContextManager>
    </BrowserRouter>,
    document.getElementById('app')
);
