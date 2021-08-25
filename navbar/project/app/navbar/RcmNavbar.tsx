import React, { useState, useEffect } from 'react';
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

import Logo from './Logo';

interface IState {
  isOpen: boolean
}

function RcmNavBar(): JSX.Element {

  window.addEventListener('message', function (e) {
    if (e.data.type === 'message-to-child') {
      console.log(e.data);
      console.log('recieved message parent container - navbar')
     }
  });


  const [isOpen, setIsOpen] = useState<IState['isOpen']>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="navbar navbar-default navbar-brand-availity" expand="md" fixed="top">
        <Logo />
        <NavbarToggler onClick={toggle} />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/"><span className="icon icon-home navbar-default-icon" />Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/"><span className="icon icon-bell-alt navbar-default-icon" />Notifications <Badge>3</Badge></NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                <span className="icon icon-building navbar-default-icon" /> Availity Test Office
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
                Support
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
                A Test User
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

export default RcmNavBar;