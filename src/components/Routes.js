import React from 'react';
import {Switch, Route} from 'react-router';

import AccountPage from './account/AccountPage';
import LoginPage from './account/LoginPage';
import SignUpPage from './account/SignUpPage';

const NoMatch = () =>
    <div>{'No Match'}</div>;
const Home = () =>
    <div>{'Home'}</div>;
const Routes = (props) => (
    <Switch>
        <Route
            component={Home}
            exact
            path="/"
        />
        <Route
            component={LoginPage}
            path="/page/Login"
        />
        <Route
            component={AccountPage}
            path="/page/Account"
        />
        <Route
            component={SignUpPage}
            path="/page/sign-up"
        />
        <Route component={NoMatch} />
    </Switch>
);

export default Routes;
