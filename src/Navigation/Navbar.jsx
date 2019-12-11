import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavbarText
} from 'reactstrap';

function handleLogout() {
  // We clear the storage so we know that we are logged out,
  // then redirect to the login page and reload so we can make sure the
  // sidebar does not show
  localStorage.clear();
  // window.location.reload(true);
  window.location.pathname="/";
}

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{paddingBottom: "50px"}}>
      <Navbar color="light" light expand="md" className="fixed-top">
        <NavbarBrand href="/">Something to Rant About</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
              {
                !props.loggedIn ?
                <>
                  <NavItem>
                    <NavLink href="/Login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Signup">Sign-up</NavLink>
                  </NavItem>
                </>
                :
                <>
                  <NavItem>
                    <NavLink href="/Home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/New Post">New Post</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/My Posts">My Posts</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Account">Account</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/" onClick={() => handleLogout()}>Logout</NavLink>
                  </NavItem>
                </>
              }
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
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
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;