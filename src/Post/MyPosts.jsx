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
  backgroundColor: "#515585",
  margin: "10px",
  padding: "15px"
  }
};


export default function MyPosts(props) {

  // Will change to post_id and user_id
  // AxiosGetPost(23, 1)
  const [res, setRes] = React.useState([]);
  const [Redir, setRedirect] = React.useState(false);

  useEffect(() => {
    axios.get(`/post/get/${localStorage.getItem('user_id')}`).then( result => {
      setRes(result.data);
    }).catch(e => console.log(e));
    // Update the document title using the browser API
  }, []);

  let first_name = localStorage.getItem('first_name').replace(/['"]+/g, '');

  return (
    <Col style={styles.Root}>
      {
        res.map((index, idx) => (
          <Card key={idx} style={{marginBottom: "5px", marginTop: "5px", marginRight: "5px"}}
            onClick={() => setRedirect(true)}>
          {Redir && <Redirect to={{ pathname: "/Post/" +  index["post_id"]}}/>}

            <Header
                username={first_name}
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