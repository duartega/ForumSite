import React, { useEffect } from 'react';
import Header from '../Post/Header';
import Body from '../Post/Body';
import Footer from '../Post/Footer';
import axios from '../ConfigAxios';
import { Card } from '@material-ui/core';
import {Redirect} from 'react-router-dom';


import {
  Row,
  Col,
} from 'reactstrap';
import { CompareSharp } from '@material-ui/icons';

const styles = {
  Root: {
  // height: "95vh",
  backgroundColor: "#515585",
  margin: "10px",
  padding: "15px"
  }
};


export default function MyPosts(props) {

    console.log(...props.data)
    let data = [...props.data];
  return (
    <Col style={styles.Root}>
      {
        props.data.map((index, idx) => (
          <Card key={idx} style={{marginBottom: "5px", marginTop: "5px", marginRight: "5px"}}>
          {console.log(index)}

            <Header
                username={index["first_name"]}
                date={index["time_date"]}
                headerTitle={index["post_header"]}
                views={props.views}
              />
              <hr style={{marginLeft: "100px", marginRight: "100px"}}/>
              <Body body={index["post_body"]}/>
              {props.body && <hr/>}
              <Footer upvote={0} downvote={0}/>
            </Card>
        ))
      }
    </Col>
  )
};