import React, { useState, useEffect } from 'react';
import { AuthContext } from '../../App';
import axios from '../../ConfigAxios';
import {Redirect} from 'react-router-dom';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback
} from 'reactstrap';


function keyPress(e) {
    if (e.keyCode === 13) {
      console.log("Enter key was pressed", e.target.value)
    }
}

export default function Login() {

  const [Email, setEmail] = useState(null);
  const [EmptyEmail, setEmptyEmail] = useState(false);
  const [Password, setPassword] = useState(null);
  const [EmptyPassword, setEmptyPassword] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const { dispatch } = React.useContext(AuthContext);

  function checkFields() {
    if (!Email) {
      setEmptyEmail(true);
      setIncorrectLogin(false);
    } else if (Email) {
      setEmptyEmail(false);
    }

    if (!Password) {
      setEmptyPassword(true);
    } else if (Password) {
      setEmptyPassword(false);
    }

    return;
    
  }

  function login(Email, Password) {

    checkFields();

    if (!Email || !Password) {
      return;
    }
    
    setIsLoading(true);
    axios.post(`/user/login/${Email}/${Password}`).then( result => {
      // Check if any user data return, if it did then we know the login was successful
      if (!result.data[0]) {
        // alert('Credentials incorrect. Please try again.')
        setIsLoading(false);
        setIncorrectLogin(true);
        setEmail("");
        setPassword("");
      } else {
        // alert('Login Successful.');
        setIsValidated(true);
        setIsLoading(false);
        dispatch({
          type: "LOGIN",
          payload: result.data[0]
      })
      }
    }).catch(e => console.log("Error: ", e));
  };

  function inputCheck() {
    if (EmptyEmail === true || incorrectLogin === true) return true;
  }

  return(
    <Container className="center-sign-up card-sign-up" onSubmit={e => e.preventDefault() }>
      <h2 className="sign-up-header">Login</h2>
        {isValidated && <Redirect to={{ pathname: "/Home" }}/>}
        <Form>
          <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              id="Email"
              invalid={inputCheck()}
              autoFocus
              value={Email}
              required
              onChange={(text) => setEmail(text.target.value)}
              placeholder="Ex: JohnSmith@gmail.com"
            />
          {!incorrectLogin ? "" : <FormFeedback>Email/Password incorrect. Please try again.</FormFeedback>}
          {EmptyEmail && <FormFeedback>Please enter your email.</FormFeedback>}
          </FormGroup>
          </Col>
        </Form>

        <Form>
          <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
            type="password"
            value={Password}
            invalid={EmptyPassword || incorrectLogin}
            required
            onChange={text => setPassword(text.target.value)}
            placeholder="********"
            />
          {!incorrectLogin ? "" : <FormFeedback>Email/Password incorrect. Please try again.</FormFeedback>}
          {EmptyPassword && <FormFeedback>Please enter your password.</FormFeedback>}
            </FormGroup>
          </Col>
          <Col>
            <Button
            className="btn-100"
            color="primary"
            onClick={() => login(Email, Password)}
            disabled={isLoading}
            >{isLoading ? 'Loading...' : 'Submit'}</Button>
          </Col>
        </Form>
    </Container>
  )
}