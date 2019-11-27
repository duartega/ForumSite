import React from 'react';
import './App.css';
// import NavBar from "./Components/Stateless/NavBar";
import getThePage from './Navigation/getThePage';
import { reducer } from './Context/Reducers/Index';
import { Redirect } from 'react-router-dom';
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
    <AuthContext.Provider
    value={{
      state,
      dispatch
    }}>
        {/* <NavBar/> */}
        {getThePage()}
        {!Logout ? "" : (
          <Redirect
          to={{
            pathname: "/",
          }}/>
        )}
        <button onClick={() => logout()}>Logout</button>
    </AuthContext.Provider>
  );
}

export default App;