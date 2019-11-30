import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function SideBar(props) {

  const titles = ['Home', 'New Post', 'My Posts', 'Account'];

  function handleLogout() {
    // We clear the storage so we know that we are logged out,
    // then redirect to the login page and reload so we can make sure the
    // sidebar does not show
    localStorage.clear();
    window.location.reload(true);
    window.location.pathname="/";
  }

  return (
    <Col xs="1" style={{backgroundColor: "#393e46"}}>
      { titles.map((index, idx) => (
        <Row key={idx} style={{marginLeft: "15px", marginTop: "15px"}}>
          <Link to={index}>{index}</Link>
        </Row>
      ))}
      <Row style={{marginLeft: "15px", marginTop: "15px"}}>
        <Link to="/" onClick={() => handleLogout()}>
        Logout
        </Link>
      </Row>
    </Col>
  )
};