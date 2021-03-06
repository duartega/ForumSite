import React, { useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import axios from '../ConfigAxios';
import { Card } from '@material-ui/core';
import {Redirect} from 'react-router-dom';


import {
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


export default function MyPosts(props) {

  // Will change to post_id and user_id
  // AxiosGetPost(23, 1)
  const [res, setRes] = React.useState([]);
  const [Redir, setRedirect] = React.useState(false);
  const [PostID, setPostID] = React.useState(null);

  useEffect(() => {
    let u_id = localStorage.getItem('user_id');
    axios.get(`/post/get/${u_id}`).then( result => {
      console.log("RESULT: ", result.data);
      setRes(result.data);
      console.log(result)
    }).catch(e => console.log(e));
    // Update the document title using the browser API
  }, []);

  let first_name = localStorage.getItem('first_name').replace(/['"]+/g, '');

  function handleRedir(post_id) {
    setPostID(post_id);
    setRedirect(true) ;
  }

  return (
    <Col style={styles.Root}>
      {
        res.map((index, idx) => (
          <Card key={idx} style={styles.Card}
            onClick={() => handleRedir(index.p_id)}>
          {Redir && <Redirect to={{ pathname: "/Post/" +  PostID}}/>}

            <Header
                username={first_name}
                date={index["time_date"]}
                headerTitle={index["post_header"]}
                views={props.views}
              />
              <hr style={{marginLeft: "100px", marginRight: "100px"}}/>
              <Body body={index["post_body"]}/>
              {props.body && <hr/>}
              <Footer upvote={index["post_up_votes"]} downvote={index["post_down_votes"]} p_id={index["p_id"]}/>
            </Card>
        ))
      }
    </Col>
  )
};