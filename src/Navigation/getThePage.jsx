import React from 'react';
import Landing from '../User/Login/Login';
import MainPostPage from '../Post/MainPostPage';
import Main from '../Components/MainScreen';
import NewPost from '../Post/CreatePost';
import Account from '../User/Account/Settings';
import MyPosts from '../Post/MyPosts';
import Signup from '../User/SignUp/Signup';

// import ErrorPage from './ErrorPage';
import { Route, Switch, Redirect } from 'react-router-dom';

export default function getThePage(isAuthenticated) {

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("localStorage: ", localStorage.getItem("user_id"))
  return(
      <Switch>
        {!localStorage.getItem("user_id") ? (
          <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/Login">
            <Landing />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          </Switch>
        ) : (
          <Switch>
          <Route exact path="/Home">
            <MainPostPage />
          </Route>
          <Route exact path="/My Posts">
            <MyPosts />
          </Route>
          <Route exact path="/New Post">
            <NewPost />
          </Route>
          <Route exact path="/Account">
            <Account />
          </Route>
          <Route exact path="/Sign-up">
            <Signup />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="*">
            <MainPostPage />
          </Route>
          </Switch>
        )
        }

        {/* <Route path="/">
          <ErrorPage/>
        </Route> */}
      </Switch>
  )

};