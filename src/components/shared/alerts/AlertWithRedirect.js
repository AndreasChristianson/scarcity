import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import ScarcityAlert from './ScarcityAlert';

const AlertWithRedirect = ({title, url, history, time, children, ...props}) => {
    setTimeout(() => history.push(url), time * 1000);
    const redirectMessage =
        <Fragment>{'Redirecting to '}<Link to={url}>{title}</Link>{` in ${time} seconds...`}</Fragment>;

    return (
        <ScarcityAlert
            {...props}
            subMessage={redirectMessage}
        >
            {children}
        </ScarcityAlert>
    );
};

AlertWithRedirect.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.number,
    history: PropTypes.object,
    children: PropTypes.node
};

AlertWithRedirect.defaultProps = {
    time: 2
};

export default withRouter(AlertWithRedirect);
