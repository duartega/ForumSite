import React from 'react';
import './App.css';
// import NavBar from "./Components/Stateless/NavBar";
import getThePage from './Navigation/getThePage';
import SideBar from './Components/SideBar';
import { Row, Col } from 'reactstrap';
import { reducer } from './Context/Reducers/Index';
import { Redirect } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
export const AuthContext = React.createContext();

function App() {

  const [state, dispatch] = React.useReducer(reducer, false);
  const [Logout, setLogout] = React.useState(false);

  // Change the default font to use Roboto
  // const font = <link href="https://fonts.googleapis.com/css?family=Slabo+27px&display=swap" rel="stylesheet"/>;

  function logout() {
    dispatch({type: "LOGOUT"});
    setLogout(!Logout);
  };

  return (
    <AuthContext.Provider value={{state, dispatch}}>
       <Navbar loggedIn={localStorage.getItem("user_id")}/>
      <Row style={{paddingLeft: "25px", paddingRight: "15px"}}>
        {/* {localStorage.getItem("user_id") && <SideBar/>} */}
        <Col style={{paddingLeft: "0px"}}>
       
        {getThePage()}
        </Col>
      </Row>
    </AuthContext.Provider>
  );
}

export default App;