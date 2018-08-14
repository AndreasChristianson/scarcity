import React from 'react';
import {
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {withUser} from './UserContext';

const LoginMenuItem = (props) => {
    if (props.userInfo.isLoggedIn) {
        return (
            <UncontrolledDropdown
                inNavbar
                nav
            >
                <DropdownToggle
                    caret
                    nav
                >
                    {props.userInfo.user.name}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link to="/page/account">
                            {'Account'}
                        </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/page/login">
                            {'Logout'}
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    return (
        <NavItem>
            <NavLink
                tag={Link}
                to="/page/login"
            >
                {'Login'}
            </NavLink>
        </NavItem>
    );
};

LoginMenuItem.propTypes = {
    userInfo: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string
        }),
        isLoggedIn: PropTypes.bool
    })
};

export default withUser(LoginMenuItem);
