import React, { useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import axios from '../ConfigAxios';
import { Card } from '@material-ui/core';
import { AuthContext } from '../App';

import {
  Row,
  Col,
} from 'reactstrap';

const styles = {
  Root: {
  // height: "95vh",
  // backgroundColor: "#515585",
  // margin: "10px",
  paddingTop: "15px",
  paddingBottom: "15px",
  },
  Card: {
    marginBottom: "5px",
    marginTop: "5px",
    marginRight: "5px",
    border: "1px solid",
    borderColor: "#808080"
  }
};


export default function MainPostPage(props) {

  const [res, setRes] = React.useState([]);

  useEffect(() => {
    axios.get(`/post/getAllPosts`).then( result => {
      setRes(result.data);
    }).catch(e => console.log(e));
  }, []);


  return (
    <Col style={styles.Root}>
      {
        res.map((index, idx) => (
          <Card key={idx} style={styles.Card} >
            <Header
                username={index["first_name"]}
                date={index["time_date"]}
                headerTitle={index["post_header"]}
                views={index["views"]}
              />
              <hr style={{marginLeft: "100px", marginRight: "100px"}}/>
              <Body body={index["post_body"]}/>
              {index["post_body"] && <hr/>}
              <Footer upvote={index["post_up_votes"]} downvote={index["post_down_votes"]}/>
            </Card>
        ))
      }
    </Col>
  )
};