import React from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

export default function Login() {

  const [Email, setEmail] = React.useState(null);
  const [Password, setPassword] = React.useState(null);

  return(
    <Container className="center-sign-up card-sign-up">
      <h2 className="sign-up-header">Login</h2>

        <Form>
          <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              id="Email"
              name="Email"
              required
              onChange={text => setEmail(text)}
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
            onChange={text => setPassword(text)}
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
}