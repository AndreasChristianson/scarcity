import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';

import LoginMenuItem from '../account/LoginMenuItem';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle=() => {
        this.setState((oldState) => ({
            isOpen: !oldState.isOpen
        }));
    }

    render() {
        return (
            <Navbar
                color="dark"
                dark
                expand="md"
                light
            >
                <NavbarBrand
                    tag={Link}
                    to="/"
                >{'Scarcity'}
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <Nav
                        className="ml-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/page/somewhere/"
                            >{'Test'}
                            </NavLink>
                        </NavItem>
                        <LoginMenuItem />
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
