import React from 'react';
import { Col } from 'reactstrap';
import UserAvatar from '../User/UserAvatar';

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
  // TODO: Need to fix centering to be centered with the image
  return (
    <Col>
        <UserAvatar />
        <p style={styles.UserName}>Gabriel Duarte</p>
        <p style={styles.UserName}>10/19/2020</p>
        <p style={styles.UserName}>Viewed: {props.views ? props.views + " " : "0 " } times</p>
        <h2 style={styles.Header}>Aliens Exist!</h2>
        {/* <p style={styles.UserName}>{props.username}</p>
        <p style={styles.UserName}>{props.date}</p>
        <h2 style={styles.Header}>{props.headerTitle}</h2> */}
      </Col>
  )};