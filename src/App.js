import React, {useState} from 'react';
import './App.css';
import getThePage from './Navigation/getThePage';
import { Row, Col } from 'reactstrap';
import { reducer } from './Context/Reducers/Index';
import Navbar from './Navigation/Navbar';
export const AuthContext = React.createContext();

function App() {

  const [state, dispatch] = React.useReducer(reducer, false);
    const [Dark_Mode, setDark_Mode] = useState(localStorage.getItem('dark_mode_active'));
    const [TextColor, setTextColor] = useState("black");

    if (Dark_Mode === "1") {
        setDark_Mode("black")
        setTextColor("white")
    }


    // Change the default font to use Roboto
  // const font = <link href="https://fonts.googleapis.com/css?family=Slabo+27px&display=swap" rel="stylesheet"/>;
  return (
    <AuthContext.Provider value={{state, dispatch}}>
       <Navbar loggedIn={localStorage.getItem("user_id")}/>
      <Row xl style={{paddingLeft: "15px", backgroundColor: "#FAFAFA", height: window.innerHeight-65}}>
        <Col style={{paddingLeft: "0px", backgroundColor: Dark_Mode}}>

        {getThePage()}
        </Col>
      </Row>
    </AuthContext.Provider>
  );
}

export default App;