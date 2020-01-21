import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback, Row, NavLink
  } from 'reactstrap';

export default function ForgotAccount () {

    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);

    function resetPassword(Username, Password) {
        // Make Axios Call Here
    }


    return (
        <Container className="center-sign-up card-sign-up" onSubmit={e => e.preventDefault() }>
        <h2 className="sign-up-header">Reset Password</h2>
          <Form>
            <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                id="Email"
                // invalid={inputCheck()}
                autoFocus
                value={Username}
                required
                onChange={(text) => setUsername(text.target.value)}
                placeholder="Ex: jSmtih123@gmail.com"
              />
            </FormGroup>
            </Col>
              <Col>
                  <Button
                      className="btn-100"
                      color="primary"
                      onClick={() => resetPassword(Username, Password)}
                  >Submit</Button>
              </Col>
          </Form>
  
          {/*<Form>*/}
          {/*  <Col>*/}
          {/*  <FormGroup>*/}
          {/*    <Label>Password</Label>*/}
          {/*    <Input*/}
          {/*    type="password"*/}
          {/*  //   value={Password}*/}
          {/*  //   invalid={EmptyPassword || incorrectLogin}*/}
          {/*    required*/}
          {/*    onChange={text => setPassword(text.target.value)}*/}
          {/*    placeholder="********"*/}
          {/*    />*/}
          {/*    </FormGroup>*/}
          {/*  </Col>*/}
          {/*  */}
          {/*</Form>*/}
      </Container>
    )
};