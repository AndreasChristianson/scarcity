import React from 'react';
import {Link} from 'react-router-dom';

import Page from './shared/Page';
import ErrorAlert from './shared/alerts/ErrorAlert';

const NotAuthorized = () => (
    <Page>
        <h1>{'Not Authorized'}</h1>
        <ErrorAlert>
            {'Please '}<Link to="/page/login">{'log in'}</Link>{' to view this page.'}
        </ErrorAlert>
    </Page>);

export default NotAuthorized;
