import React, { useState } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

export default function SignUp() {

  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [UserName, setUserName] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Email, setEmail] = useState(null);

  return (
    <Container className="center-sign-up card-sign-up">
      <h2 className="sign-up-header">Sign-up</h2>
      <Form className="orm">
        <Col>
          <FormGroup>
          <Label>First Name</Label>
          <Input
          type="text"
          name="First Name"
          id="FirstName"
          placeholder="Ex: John"
          maxLength="50"
          required
          />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
            type="text"
            name="Last Name"
            id="LastName"
            placeholder="Ex: Smith"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            type="email"
            name="Email"
            id="Email"
            placeholder="Ex: JohnSmith@gmail.com"
            maxLength="100"
            required
            />
          </FormGroup>
        </Col>

        <Col>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Col>
            <Button className="btn-100" color="primary">Submit</Button>
          </Col>
      </Form>
    </Container>
  )
};