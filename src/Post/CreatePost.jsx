import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Input
} from 'reactstrap';
import { AxiosCreatePost } from '../Axios/Axios';
import {Redirect} from "react-router-dom";
import axios from "../ConfigAxios";

const styles = {
  Root: {
    margin: 10,
      marginTop: 15
  },
  Input: {
    marginTop: "10px"
  },
  Multiline: {
    height: "500px",
    marginTop: "10px"
  },
  charCounter: {
    textAlign: "right",
  },
  Body: {
    margin: "20px 10px 10px 10px"
  }
}



export default function CreatePost() {

  const [Header, setHeader] = useState(null);
  const [Body, setBody] = useState(null);
  const [Redir, setRedirect] = React.useState(false);
  const [PostID, setPostID] = React.useState(null);
  const [Dark_Mode, setDark_Mode] = useState(localStorage.getItem('dark_mode_active'));
  const [TextColor, setTextColor] = useState("black");

  if (Dark_Mode === "1") {
      setDark_Mode("black");
      setTextColor("white")
  }


    function CheckInput() {
    if (!Header) {
      alert('Please fill out the question field.');
    } else {
      // TODO: Update so that the user id is the currently logged in user
        let User_id = localStorage.getItem("user_id");
      AxiosCreatePost(Header, Body, localStorage.getItem("user_id"));
      axios.get(`/post/getRecentPost/${User_id}/`,
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('JWT')
            },
            user_id: User_id,
          }
      ).then( result => {
          // TODO: Redirect to page for the post that was just created
          // console.log(result.data)
          setPostID(result.data.p_id);
          setRedirect(true);
      }).catch(e => console.log(e));
      // Was going to set this to null for memory leaks but taking out for now as I test
      // setHeader(null);
      // setBody(null);

      // {Redir && <Redirect to={{ pathname: "/Post/" +  PostID}}/>}
    };
  };

  function CancelPost() {
    // Add modal here to check if they want to cancel
  }

  return(
    <Col style={styles.Root}>
      {Redir && <Redirect to={{ pathname: "/Post/" +  PostID}}/>}
      <Row style={styles.Root}>
        <h4 style={{color: TextColor}}>Title</h4>
        <Input
        style={styles.Input}
        placeholder="Ex: Is bigfoot real?"
        onChange={text => setHeader(text.target.value)}
        maxLength="100"
        type="text"
        required
        />
      </Row>
      <Row style={{color: TextColor, margin: "20px 10px 10px 10px"}}>
        Include all information that you deem necessary for someone to answer your post (optional):
        <Input
        type="textarea"
        style={styles.Multiline}
        placeholder="Ex: If you believe bigfoot is real, where do you think it lives and how tall is it?"
        onChange={text => setBody(text.target.value)}
        maxLength="5000"
        />
      </Row>
      <Col style={styles.charCounter}>
        <p>{Body ? Body.length : 0}/5000</p>
      </Col>
      <Row style={styles.Body}>
        <Button color="primary" onClick={() => CheckInput()}>Submit</Button> &nbsp;
        <Button color="primary" onClick={() => CancelPost()}>Cancel</Button>
      </Row>
    </Col>
  )
};