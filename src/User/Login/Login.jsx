import React, { useState } from 'react';
import { AuthContext } from '../../App';
import axios from '../../ConfigAxios';
import {Redirect} from 'react-router-dom';

import '../../Config';


import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback, Row, NavLink
} from 'reactstrap';


export default function Login() {

  var jwt_decode = require('jwt-decode');
  const [Email, setEmail] = useState("");
  const [EmptyEmail, setEmptyEmail] = useState(false);
  const [Password, setPassword] = useState("");
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
    axios.post(`/user/login/`, {
        user_name: Email,
        password: Password
    }).then( result => {
      // Check if any user data return, if it did then we know the login was successful
      if (result.data.token) {
        setIsValidated(true);
        setIsLoading(false);
        var decoded = jwt_decode(result.data.token);
        localStorage.setItem('JWT', result.data.token);
        dispatch({
          type: "LOGIN",
          payload: decoded.data
      })
      }
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404 || 401) {
          setIsLoading(false);
          setIncorrectLogin(true);
          setEmail("");
          setPassword("");
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error: ', error.message);
      }
    });
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
            <Label>Username</Label>
            <Input
              type="email"
              id="Email"
              autocomplete
              invalid={inputCheck()}
              autoFocus
              value={Email}
              required
              onChange={(text) => setEmail(text.target.value)}
              placeholder="Ex: JohnSmith94"
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
          <Row>
          <Col style={{textAlign: "center"}}>
          <NavLink href="/Signup">Don't have an account?</NavLink>&nbsp;
          </Col>
          <Col style={{textAlign: "center"}}>
            <NavLink href="/Forgot_account">Forgot Account?</NavLink> &nbsp;
          </Col>
          </Row>
        </Form>
    </Container>
  )
}