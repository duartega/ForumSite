import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Input
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';


const styles = {
  Root: {
    margin: 10
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

  function CheckInput() {
    if (!Header) {
      alert('Please fill out the question field.');
    } else {
      console.log("This will be submitted using axios.");
    };
  };

  function CancelPost() {
    // Add modal here to check if they want to cancel
  }

  return(
    <Col style={styles.Root}>
      <Row style={styles.Root}>
        <h4>Title</h4>
        <Input
        style={styles.Input}
        placeholder="Ex: Is bigfoot real?"
        onChange={text => setHeader(text.target.value)}
        maxLength="100"
        type="text"
        required
        />
      </Row>
      <Row style={styles.Body}>
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