import React, { useEffect } from 'react';
import Header from '../Post/Header';
import Body from '../Post/Body';
import Footer from '../Post/Footer';
import axios from '../ConfigAxios';
import { Card } from '@material-ui/core';


import {
  Col,
} from 'reactstrap';

const styles = {
  Root: {
  // height: "95vh",
  backgroundColor: "#515585",
  margin: "10px",
  padding: "15px"
  }
};


export default function MyPosts(props) {

  return (
    <Col style={styles.Root}>
      {
        props.data.map((index, idx) => (
          <Card key={idx} style={{marginBottom: "5px", marginTop: "5px", marginRight: "5px"}}>
            <Header
                username={index["user_name"]}
                date={index["time_date"]}
                views={props.views}
              />
              <hr style={{marginLeft: "100px", marginRight: "100px"}}/>
              <Body body={index["comment_body"]}/>
              {props.body && <hr/>}
              <Footer upvote={index["comment_up_vote"]} downvote={index["comment_down_vote"]}/>
            </Card>
        ))
      }
    </Col>
  )
};