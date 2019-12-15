import React, { useEffect } from 'react';
import Header from '../Post/Header';
import Body from '../Post/Body';
import Footer from '../Post/Footer';
import axios from '../ConfigAxios';
import { Card } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Comment from '../Comments/Comment';
import {
  Row,
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

  let { post_id } = useParams();
  let UserName = localStorage.getItem('first_name').replace(/['"]+/g, '');
  let User_id = localStorage.getItem('user_id');

  // Will change to post_id and user_id
  // AxiosGetPost(23, 1)
  const [Post, setPost] = React.useState("");
  const [Comments, setComments] = React.useState([]);

  useEffect(() => {
    axios.get(`/post/get/${User_id}/${post_id}`).then( result => {
      setPost(...result.data);
    }).catch(e => console.log(e));

    console.log(post_id)
    axios.get(`/post/getComments/${post_id}`).then( result => {
        setComments(result.data);
        console.log("Get Comments: ", result.data);
      }).catch(e => console.log(e));
    // Update the document title using the browser API
    
  }, []);

  return (
    <Col style={styles.Root}>
          <Card style={{marginBottom: "5px", marginTop: "5px", marginRight: "5px"}}>
            <Header
                username={UserName}
                date={Post["time_date"]}
                headerTitle={Post["post_header"]}
                views={props.views}
              />
              <hr style={{marginLeft: "100px", marginRight: "100px"}}/>
              <Body body={Post["post_body"]}/>
              {props.body && <hr/>}
              <Footer upvote={0} downvote={0}/>
           </Card>
           {
               Comments.map((index, idx) => (
                    <Comment data={Comments} />
               ))
           } 
    </Col>
  )
};