import React, { useState } from 'react';
import { AuthContext } from '../App';
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



const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = React.useContext(AuthContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{paddingBottom: "50px"}}>
      <Navbar style={{backgroundColor: "white", borderBottom: "1px solid", borderColor: "#808080"}} light expand="md" className="fixed-top">
        <NavbarBrand href="/">Something to Protest About</NavbarBrand>
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
                    <NavLink href="/" onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                          payload: ""
                        })
                    }>Logout</NavLink>
                  </NavItem>
                </>
              }
              {props.loggedin && 
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
              }
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;