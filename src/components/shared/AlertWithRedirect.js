import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import ScarcityAlert from './ScarcityAlert';

const AlertWithRedirect = ({redirect: {title, url}, history, ...props}) => {
    setTimeout(() => history.push(url), 2000);
    const redirectMessage =
        <Fragment>{'Redirecting to '}<Link to={url}>{title}</Link>{' in two seconds...'}</Fragment>;

    return (
        <ScarcityAlert
            {...props}
            subMessage={redirectMessage}
        />
    );
};

AlertWithRedirect.propTypes = {
    redirect: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string
    }),
    history: PropTypes.object
};

export default withRouter(AlertWithRedirect);
