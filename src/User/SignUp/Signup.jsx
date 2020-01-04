import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import {Redirect} from 'react-router-dom';
import { AuthContext } from '../../App';
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

  function signup() {
    checkFields();

    if (!FirstName || !LastName || !Email || !Password || !UserName) {
      return;
    }

    setIsLoading(true);
    let user_id_value = "";
    axios.get(`/user/checkUsername/${UserName}`).then ( result => {
      console.log(result.data);
      if (result.data.unused) {
        setUsernameTaken(false);
        axios.get(`/user/checkEmail/${encodeURIComponent(Email)}`).then ( result => {
          if (result.data.unused) {
            axios.post(`/user/signup/${UserName}/${Password}`).then ( result => {
              axios.get(`/user/user_id/${UserName}`).then(result => {
                user_id_value = result.data[0].u_id;
                axios.post(`/user/signup/${user_id_value}/${FirstName}/${LastName}/${encodeURIComponent(Email)}`).then( result => {
                  console.log("UIV: ", user_id_value)
                  setIsLoading(false);
                  setIsValidated(true);
                  let payload = {u_id: user_id_value, first_name: FirstName, last_name: LastName, email_address: Email};
                  dispatch({
                    type: "LOGIN",
                    payload: payload
                  })
              })
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
        return;
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
            type="Username"
            id="Username"
            placeholder="Ex: j.smith294"
            maxLength="50"
            required
            onChange={(text) => setUserName(text.target.value)}
            />
            {UsernameTaken && <FormFeedback>Username is already taken.</FormFeedback>}
            {EmptyUserName && (!UsernameTaken && <FormFeedback>Please enter an email.</FormFeedback>)}
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            invalid={EmptyEmail || EmailTaken}
            type="email"
            id="Email"
            placeholder="Ex: JohnSmith@gmail.com"
            maxLength="100"
            required
            onChange={(text) => setEmail(text.target.value)}
            />
            {EmailTaken && <FormFeedback>Email already in use.</FormFeedback>}
            {EmptyEmail && (!EmailTaken &&  <FormFeedback>Please enter a password.</FormFeedback>)}
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