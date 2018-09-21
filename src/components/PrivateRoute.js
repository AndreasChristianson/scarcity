import React from 'react';
import {Route} from 'react-router';
import PropTypes from 'prop-types';

import {withUser} from './account/UserContext';
import NotAuthorized from './NotAuthorized';

const PrivateRoute = ({userInfo: {isLoggedIn}, path, component}) =>
    <Route
        component={isLoggedIn ? component : NotAuthorized}
        path={path}
    />;

PrivateRoute.propTypes = {
    userInfo: PropTypes.shape({
        isLoggedIn: PropTypes.bool
    }),
    path: PropTypes.string,
    component: PropTypes.func
};

export default withUser(PrivateRoute);
