import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import {Redirect} from 'react-router-dom';
import { AuthContext } from '../../App';
import * as Validator from 'email-validator';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormFeedback
} from 'reactstrap';

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
  const [UsernameTaken, setUsernameTaken] = useState(false);
  const [EmailTaken, setEmailTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [EmptyPassword, setEmptyPassword] = useState(false);
  const [ValidEmail, setValidEmail] = useState(false);
  const [InvalidEmail, setInvalidEmail] = useState(false);
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
    
    return;
  }

  async function signup() {
    checkFields();

    if (!FirstName || !LastName || !Email || !Password || !UserName) {
      return;
    }

    setIsLoading(true);

    ValidEmail && axios.post(`/user/signup`, {
      user_name: UserName,
      password: Password,
      first_name: FirstName,
      last_name: LastName,
      email_address: Email
    }).then (result => {
      let u_id = result.data[0].u_id;
      localStorage.setItem('JWT', result.data.token);
      setIsLoading(false);
      setIsValidated(true);
      let payload = {u_id, first_name: FirstName, last_name: LastName, email_address: Email};
      dispatch({
        type: "LOGIN",
        payload: payload
      })
      }).catch((err) => {
        // This is when they ignore that the username or email is already taken
      setIsLoading(false);
      alert("Please double check that you aren't using a username or email that is already taken.");
      console.log(err)
    });

    if (!ValidEmail) {
      setIsLoading(false)
      setInvalidEmail(true);
    }
  }

  function handleEmailCheck(email_address) {
    setValidEmail(Validator.validate(email_address.target.value));
    setEmail(email_address.target.value);

    // ValidEmail && setInvalidEmail(false)

    axios.get(`/user/CheckEmailInstantly/${email_address.target.value}`).then(result => {
      if (result.status === 200) {
        setEmailTaken(false);
      }
    }).catch(err => {
      if (err.response.status === 409) {
        setEmailTaken(true);
        setIsLoading(false);
      }
    }
    );
  }

  function handleUsernameCheck(user_name) {
    setUserName(user_name.target.value);
    axios.get(`/user/CheckUsernameInstantly/${user_name.target.value}`).then(result => {
      if (result.status === 200) {
        setUsernameTaken(false);
      }
    }).catch(err => {
          if (err.response.status === 409) {
            setUsernameTaken(true);
            setIsLoading(false);
          }
        }
    );
  }

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
                invalid={UsernameTaken || EmptyUserName}
            type="username"
            id="Username"
            placeholder="Ex: j.smith294"
            maxLength="50"
            required
            onChange={(text) => handleUsernameCheck(text)}
            />
            {UsernameTaken && <FormFeedback>Username is already taken.</FormFeedback>}
            {EmptyUserName && (!UsernameTaken && <FormFeedback>Please enter a username.</FormFeedback>)}
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            invalid={EmptyEmail || EmailTaken || InvalidEmail}
            type="email"
            id="Email"
            placeholder="Ex: JohnSmith@gmail.com"
            maxLength="100"
            required
            onChange={(text) => handleEmailCheck(text)}
            />
            {EmailTaken && <FormFeedback>Email already in use.</FormFeedback>}
            {InvalidEmail && <FormFeedback>Please enter a valid email.</FormFeedback>}
            {EmptyEmail && (!EmailTaken &&  <FormFeedback>Please enter an email.</FormFeedback>)}
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