import React from 'react';
import SideBar from './SideBar';
import { Row, Col } from 'reactstrap';
import getThePage from '../Navigation/getThePage';

export default function Main(props) {

  return (
    <Row>
      <SideBar />
      <Col style={{backgroundColor: "red"}} >
        {/* {getThePage()} */}
      </Col>
    </Row>
  )
}