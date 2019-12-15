import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import {Redirect} from 'react-router-dom';
import { AuthContext } from '../../App';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback
} from 'reactstrap';
import { useScrollTrigger } from '@material-ui/core';

export default function SignUp() {

  const [FirstName, setFirstName] = useState(null);
  const [EmptyFirstName, setEmptyFirstName] = useState(false);
  const [LastName, setLastName] = useState(null);
  const [EmptyLastName, setEmptyLastName] = useState(false);
  const [UserName, setUserName] = useState(null);
  const [EmptyUserName, setEmptyUserName] = useState(false);
  const [Email, setEmail] = useState(null);
  const [EmptyEmail, setEmptyEmail] = useState(false);
  const [Password, setPassword] = useState(null);
  const [User_ID, setUser_ID] = useState(null);
  const [UsernameTaken, setUsernameTaken] = useState(false);
  const [EmailTaken, setEmailTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [EmptyPassword, setEmptyPassword] = useState(false);
  const { dispatch } = React.useContext(AuthContext);

  function checkFields() {
    if (!Password) {
      setEmptyPassword(true);
    } else if (Password) {
      setEmptyPassword(false);
    }

    if (!FirstName) {
      setEmptyFirstName(true);
    } else if (FirstName) {
      setEmptyFirstName(false);
    }

    if (!LastName) {
      setEmptyLastName(true);
    } else if (LastName) {
      setEmptyLastName(false);
    }

    if (!Email) {
      setEmptyEmail(true);
    } else if (EmptyEmail) {
      setEmptyEmail(false);
    }

    if (!UserName) {
      setEmptyUserName(true);
    } else if (UserName) {
      setEmptyUserName(false);
    }
    return true;
  }

  function signup() {
    if (checkFields() === true) {
      return;
    }

    setIsLoading(true);
    axios.get(`/user/checkUsername/${UserName}`).then ( result => {
      if (!result.data[0]) {
        axios.get(`/user/checkEmail/${encodeURIComponent(Email)}`).then ( result => {
          if (!result.data[0]) {
            axios.post(`/user/signup/${UserName}/${Password}`).then ( result => {
              let id = result.data.insertId;
              // If the creation was sucessful, continue to add the rest of the data
              axios.post(`/user/signup/${result.data.insertId}/${FirstName}/${LastName}/${encodeURIComponent(Email)}`).then( result => {
                setIsLoading(false);
                setIsValidated(true);
                let payload = {user_id: id, first_name: FirstName, last_name: LastName, email_address: Email};
                dispatch({
                  type: "LOGIN",
                  payload: payload
              })
                console.log("Account should have been created");
              }).catch(e => console.log("Error: ", e));
            }).catch( e => console.log("Error: ", e));
              } else {
                setEmailTaken(true);
                setEmail("");
                setIsLoading(false);
              }
        });
      } else {
        setUsernameTaken(true);
        setUserName("");
        setIsLoading(false);
      }
    });
  };

  return (
    <Container className="center-sign-up card-sign-up" onSubmit={e => e.preventDefault()}>
      <h2 className="sign-up-header">Sign-up</h2>
      {isValidated && <Redirect to={{ pathname: "/Home" }}/>}
      <Form className="form">
        <Col>
          <FormGroup>
          <Label>First Name</Label>
          <Input
          invalid={EmptyFirstName}
          type="text"
          id="Name"
          autoFocus
          placeholder="Ex: John"
          maxLength="50"
          required
          onChange={(text) => setFirstName(text.target.value)}
          />
          {EmptyFirstName && <FormFeedback>Please enter a First Name.</FormFeedback>}
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
            invalid={EmptyLastName}
            type="text"
            id="LastName"
            placeholder="Ex: Smith"
            maxLength="50"
            required
            onChange={(text) => setLastName(text.target.value)}
            />
            {EmptyLastName && <FormFeedback>Please enter a Last Name.</FormFeedback>}
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Username</Label>
            <Input
            invalid={EmptyUserName}
            type="Username"
            id="Username"
            autoFocus
            placeholder="Ex: j.smith294"
            maxLength="50"
            required
            onChange={(text) => setUserName(text.target.value)}
            />
            {UsernameTaken && <FormFeedback>Username is already taken.</FormFeedback>}
            {EmptyUserName && <FormFeedback>Please enter an email.</FormFeedback>}
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            invalid={EmptyEmail}
            type="email"
            id="Email"
            autoFocus
            placeholder="Ex: JohnSmith@gmail.com"
            maxLength="100"
            required
            onChange={(text) => setEmail(text.target.value)}
            />
            {EmailTaken && <FormFeedback>Email already in use.</FormFeedback>}
            {EmptyEmail && <FormFeedback>Please enter a password.</FormFeedback>}
          </FormGroup>
        </Col>

        <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input
                invalid={EmptyPassword}
                required
                type="password"
                id="password"
                placeholder="********"
                onChange={(text) => setPassword(text.target.value)}
            />
            {EmptyPassword && <FormFeedback>Please enter a password.</FormFeedback>}
            </FormGroup>
          </Col>
          <Col>
            <Button
            className="btn-100"
            color="primary"
            onClick={() => signup()}
            disabled={isLoading}
            >{isLoading ? 'Loading...' : 'Submit'}</Button>
          </Col>
      </Form>
    </Container>
  )
};