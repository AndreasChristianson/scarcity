import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';

import Page from '../shared/Page';

import {withUser} from './UserContext';

const AccountPage = (props) => {
    const rows = Object.keys(props.userInfo.user)
        .map((key) =>
            <tr key={key}>
                <td>{key}</td>
                <td>{props.userInfo.user[key]}</td>
            </tr>
        );

    return (
        <Page>
            <h1>{'Account Attributes'}</h1>
            <Table>
                <thead>
                    <tr>
                        <th>{'Attribute'}</th>
                        <th>{'Value'}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </Page>
    );
};

AccountPage.propTypes = {
    userInfo: PropTypes.shape({
        user: PropTypes.object
    })
};

export default withUser(AccountPage);
