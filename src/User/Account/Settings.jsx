import React, { useState } from 'react';
import axios from '../../ConfigAxios';
import Switch from '@material-ui/core/Switch';
import { AuthContext} from "../../App";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Spinner, Row
} from 'reactstrap';
import AvatarPic from '../UserAvatar';
import {Redirect} from "react-router-dom";

export default function AccountSettings() {

  // I may add a delete account function
  // Darkmode should load all pages with darkmode from now on, or at least
  // with components that are white
  const [JWT, setJWT] = useState(localStorage.getItem('JWT'));
  const [Dark_Mode, setDark_Mode] = useState(localStorage.getItem('dark_mode_active'));
  const [TextColor, setTextColor] = useState("black");
  const [SaveButtonText, setSaveButtonText] = useState('Save');
  const [SaveButtonTextDisabled, setSaveButtonTextDisabled] = useState(false);
  const [Redir, setRedir] = useState(false);
  const { dispatch } = React.useContext(AuthContext);
  const [Field, setField] = useState({
    Password: null,
    Email: null,
    FirstName: null,
    LastName: null
  });

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

  // Same thing as (text) => setPassword(text.target.value)
  // the ...Field allows us to access the json format rather than Field[name]: which doesnt work
  const handleFieldChange = name => event => {
    setField({ ...Field,[name]: event.target.value });
  };

  // Updates color scheme
  function handleSave() {
    setSaveButtonTextDisabled(true);
    setSaveButtonText(<Spinner color="info"/>);
    let u_id = localStorage.getItem('user_id');
    var value = state.checkedB ? 1 : 0;

    // had to make the adjustment of not using headers. For whatever reason, headers wont work with a put request...
    axios.put(`/user/accountInfo/${u_id}/`, {
      "Authorization": "Bearer " + JWT,
      first_name: Field.FirstName,
      last_name: Field.LastName,
      email_address: Field.Email,
      u_id: u_id,
      dark_mode_active: state.checkedB
    }).then( result => {

      // Just in case the user updates the password along with any other info
      // If we did not do this, the second change password block would be cleared and password would not update correctly
      if (Field.Password !== null) {
        axios.post(`/user/resetPassword/${u_id}/`, {
          "Authorization": "Bearer " + JWT,
          "password": Field.Password
        }).catch(err => console.log(err));
      }


      localStorage.setItem('dark_mode_active', value);
      // Only update the localstorage items that were actually modified
      let storeValue = [Field.FirstName, Field.LastName, Field.Email];
      let storeName = ['first_name', 'last_name', 'email_address'];
      for (let i = 0; i < storeValue.length; i++) {
        if (storeValue[i] !== null)
          localStorage.setItem(storeName[i], storeValue[i])
      }
      window.location.reload();
   }).catch(e => console.log(e));

    // Should only reach if the user has entered something in the password field
    if (Field.Password !== null) {
      axios.post(`/user/resetPassword/${u_id}/`, {
        "Authorization": "Bearer " + JWT,
        "password": Field.Password
      }).catch(err => console.log(err));
    }

}

// TODO: Would like to get a popup confirming/ask to enter password to delete
function DeleteAccount() {
    axios.delete(`/user/deleteAccount/${localStorage.getItem('user_id')}`,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('JWT')
          }
        }).then(result => {
          alert('Account has been deleted.');
          setRedir(true);
          dispatch({
                type: "LOGOUT",
                payload: ""
              });
        }).catch(e => console.log(e));
  };


  if (Dark_Mode === "1") {
    setDark_Mode("black");
    setTextColor("white")
  }


  return (
    <div style={{margin: "15px", backgroundColor: Dark_Mode}}>
      {Redir && <Redirect to={{ pathname: "/" }}/>}
      <Label style={{color: TextColor}}>Welcome, {localStorage.getItem('first_name')}</Label>
      <p style={{color: TextColor}}>Below are your account settings.</p>

      <Form>

      <Col>
          <FormGroup>
            <Col>
              <AvatarPic onClick={() => console.log("Will change the picture and use file upload")}/>

              <Button color="danger" style={{marginLeft: "80%"}} onClick={() => DeleteAccount()}>Delete Account</Button>
            </Col>
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
            onChange={handleFieldChange('Email')}
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
            onChange={handleFieldChange('Password')}
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
            onChange={handleFieldChange('FirstName')}
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
            onChange={handleFieldChange('LastName')}
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
          <Button className="btn-100" color="primary" disabled={SaveButtonTextDisabled} onClick={() => handleSave()}>{SaveButtonText}</Button>
        </Col>
      </Form>
    </div>
  )
}