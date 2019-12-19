import React, { useState } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import AvatarPic from '../UserAvatar';

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
  const [LastName, setLastName] = useState(null);

  return (
    <Container className="center-settings">
      <Label>Welcome, {localStorage.getItem('first_name').replace(/['"]+/g, '')}</Label>
      <p>Below are your account settings.</p>

      <Form>

      <Col>
          <FormGroup>
            <AvatarPic onClick={() => console.log("Will change the picture and use file upload")}/>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
            placeholder={localStorage.getItem('email_address').replace(/['"]+/g, '')}
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
            placeholder={localStorage.getItem('first_name').replace(/['"]+/g, '')}
            type="text"
            id="First Name"
            maxLength="50"
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
            placeholder={localStorage.getItem('last_name').replace(/['"]+/g, '')}
            type="text"
            id="Last Name"
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
        <Col>
          <Button className="btn-100" color="primary">Save</Button>
        </Col>
      </Form>
    </Container>
  )
}