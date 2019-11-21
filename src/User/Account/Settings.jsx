import React, { useState } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import Avatar from '../UserAvatar';

export default function AccountSettings() {

  // These null values will be pulled from axios instead
  // I may add a delete account function
  // Darkmode should load all pages with darkmode from now on, or at least
  // with components that are white
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Avatar, setAvatar] = useState(null);
  const [DarkMode, setDarkMode] = useState(false);
  const [FirstName, setFirstName] = useState(null);

  return (
    <Container className="center-settings">
      <Label>Welcome, {FirstName}</Label>
      <p>Below are your account settings.</p>

      <Form>

      <Col>
          <FormGroup>
            <Avatar onClick={() => console.log("Will change the picture and use file upload")}/>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            placeholder={Email}
            type="text"
            id="Email"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
            placeholder="*********"
            type="password"
            id="password"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>First Name</Label>
            <Input
            placeholder={FirstName}
            type="text"
            id="Name"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
            placeholder={LastName}
            type="text"
            id="Name"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Dark Mode Toggle</Label>

          </FormGroup>
        </Col>
      </Form>
    </Container>
  )
}