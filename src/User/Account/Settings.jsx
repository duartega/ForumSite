import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import Switch from '@material-ui/core/Switch';
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
  const [JWT, setJWT] = useState(localStorage.getItem('JWT'));
  const [Dark_Mode, setDark_Mode] = useState(localStorage.getItem('dark_mode_active'));
  const [TextColor, setTextColor] = useState("black");

  // we must convert over to bool
  let val = null;
  if (localStorage.getItem('dark_mode_active') === '1') {
    val = true
  }
  const [state, setState] = React.useState({
    checkedB: val,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  // Updates color scheme
  if (Dark_Mode === "1") {
    setDark_Mode("black");
    setTextColor("white")
  }

  // NEED TO ADD REFRESH SO CHANGED APPEAR RIGHT AWAY RATHER THAN HAVING TO LOGOUT
  function handleSave() {
    let u_id = localStorage.getItem('user_id');

    // had to make the adjustment of not using headers. For whatever reason, headers wont work with a put request...
    axios.put(`/user/accountInfo/${u_id}/`, {
      "Authorization": "Bearer " + JWT,
      first_name: FirstName,
      last_name: LastName,
      email_address: Email,
      u_id: u_id,
      dark_mode_active: state.checkedB
    }).then( response => (
        console.log("RES:", response)
    )).catch(e => console.log(e))

  }



  return (
    <div style={{margin: "15px", backgroundColor: Dark_Mode}}>
      <Label style={{color: TextColor}}>Welcome, {localStorage.getItem('first_name')}</Label>
      <p style={{color: TextColor}}>Below are your account settings.</p>

      <Form>

      <Col>
          <FormGroup>
            <AvatarPic onClick={() => console.log("Will change the picture and use file upload")}/>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label style={{color: TextColor}}>Email</Label>
            <Input
            placeholder={localStorage.getItem('email_address')}
            type="text"
            id="Email"
            maxLength="50"
            onChange={(text) => setEmail(text.target.value)}
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label style={{color: TextColor}}>Password</Label>
            <Input
            placeholder="*********"
            type="password"
            id="password"
            maxLength="50"
            onChange={(text) => setPassword(text.target.value)}
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label style={{color: TextColor}}>First Name</Label>
            <Input
            placeholder={localStorage.getItem('first_name')}
            type="text"
            id="First Name"
            maxLength="50"
            onChange={(text) => setFirstName(text.target.value)}
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label style={{color: TextColor}}>Last Name</Label>
            <Input
            placeholder={localStorage.getItem('last_name')}
            type="text"
            id="Last Name"
            maxLength="50"
            onChange={(text) => setLastName(text.target.value)}
            required
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label style={{color: TextColor}}>Dark Mode Toggle</Label>
            <Switch
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="checkedB"
                color="primary"
            />
          </FormGroup>
        </Col>
        <Col>
          <Button className="btn-100" color="primary" onClick={() => handleSave()}>Save</Button>
        </Col>
      </Form>
    </div>
  )
}