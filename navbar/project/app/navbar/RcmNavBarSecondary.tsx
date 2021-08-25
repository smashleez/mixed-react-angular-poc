import React, { useState } from 'react';
import {
    Badge,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


const openUrl = (url:string) => {
    window.location.href = url;
}

function RcmNavBarSecondary(): JSX.Element {

    return (
        <>
            <Navbar className="container-fluid navbar navbar-default navbar-secondary navbar-fixed-top mega-menu" expand="md" fixed="top">
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/#/my-react-app"><span className="icon icon-home navbar-default-icon" />Home</NavLink>
                        </NavItem>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                Patient Registration
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                Claims
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default RcmNavBarSecondary;