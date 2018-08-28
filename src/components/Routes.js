import React from 'react';
import {Switch, Route} from 'react-router';

import AccountPage from './account/AccountPage';
import LoginPage from './account/LoginPage';
import SignUpPage from './account/SignUpPage';
import ResetPasswordPage from './account/RequestResetPage';
import ChangePasswordPage from './account/ChangePasswordPage';

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
        <Route
            component={ResetPasswordPage}
            path="/page/reset-password"
        />
        <Route
            component={ChangePasswordPage}
            path="/page/change-password"
        />
        <Route component={NoMatch} />
    </Switch>
);

export default Routes;
