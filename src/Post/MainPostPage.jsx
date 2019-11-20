import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import {
  Row,
  Col,
} from 'reactstrap';

const styles = {
  Root: {
  height: "95vh",
  margin: "10px"
  }
};

const randomText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function MainPostPage(props) {
  return (
    <Col className="user-post-content" style={styles.Root}>
      <Header
      username={props.username}
      date={props.date}
      headerTitle={props.title}
      views={props.views}
      />
      <hr/>
      <Body body={randomText}/>
      {props.body ? <hr/> : null}
      <Footer upvote={0} downvote={0}/>
    </Col>
  )
};