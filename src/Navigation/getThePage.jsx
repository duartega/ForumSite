import React from 'react';
import Landing from '../User/Login/Login';
import MainPostPage from '../Post/MainPostPage';
// import ErrorPage from './ErrorPage';
import { Route, Switch } from 'react-router-dom';

export default function getThePage(isAuthenticated) {

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("localStorage: ", localStorage.getItem("user_id"))
  return(
      <Switch>
        {!localStorage.getItem("user_id") ? (
          <Route exact path="/">
            <Landing />
          </Route>
        ) : (
          <Route exact path="/Home">
            <MainPostPage />
          </Route>
        )
        }

        {/* <Route path="/">
          <ErrorPage/>
        </Route> */}
      </Switch>
  )

};