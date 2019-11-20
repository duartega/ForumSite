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
      <Body body={"this is some content for the body"}/>
      <hr/>
      <Footer upvote={props.upvote} downvote={props.downvote}/>
    </Col>
  )
};