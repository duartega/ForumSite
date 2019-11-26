import React, { useState, useEffect} from 'react';
import axios from '../../ConfigAxios';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

function login(Email, Password) {
  axios.get(`/user/login/${Email}/${Password}`).then( result => {
    // Check if any user data return, if it did then we know the login was successful
    if (!result.data[0]) {
      alert('Credentials incorrect. Please try again.')
    } else {
      alert('Login Successful.')
    }
  }).catch(e => console.log("Error: ", e));
};

function keyPress(e) {
    if (e.keyCode === 13) {
      console.log("Enter key was pressed", e.target.value)
    }
}

export default function Login() {

  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);


  return(
    <Container className="center-sign-up card-sign-up" onSubmit={e => e.preventDefault() }>
      <h2 className="sign-up-header">Login</h2>

        <Form>
          <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              id="Email"
              required
              onChange={(text) => setEmail(text.target.value)}
              placeholder="Ex: JohnSMith@gmail.com"
            />
          </FormGroup>
          </Col>
        </Form>

        <Form>
          <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
            type="password"
            required
            onChange={text => setPassword(text.target.value)}
            placeholder="********"
            />
            </FormGroup>
          </Col>
          <Col>
            <Button className="btn-100" color="primary" onClick={() => login(Email, Password)}>Submit</Button>
          </Col>
        </Form>
    </Container>
  )
}