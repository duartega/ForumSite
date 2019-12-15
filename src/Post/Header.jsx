import React from 'react';
import { Col } from 'reactstrap';
import UserAvatar from '../User/UserAvatar';
import Moment from 'react-moment';

const styles = {
  Inner: {
  backgroundColor: "blue",
  },
  UserName: {
    display: "inline",
    padding: "15px",

  },
  Header: {
    textAlign: "center",
  }
};

export default function Header(props) {

  // TODO: Format the date and time in a friendly format
  return (
    <Col style={{paddingTop: "10px"}}>
        <UserAvatar />
        <p style={styles.UserName}>{props.username}</p>
        <p style={styles.UserName}>{<Moment format="MM/DD/YYYY" >{props.date}</Moment>}</p>
        <p style={styles.UserName}>Viewed: {props.views ? props.views + " " : "0 " } times</p>
        {props.headerTitle && <h2 style={styles.Header}>{props.headerTitle}</h2>}
      </Col>
  )};