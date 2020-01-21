import React from 'react';
import Landing from '../User/Login/Login';
import MainPostPage from '../Post/MainPostPage';
import Main from '../Components/MainScreen';
import NewPost from '../Post/CreatePost';
import Account from '../User/Account/Settings';
import MyPosts from '../Post/MyPosts';
import Signup from '../User/SignUp/Signup';
import SinglePost from '../Post/SinglePost';
import ForgotAccount from '../User/Account/Forgot'

// import ErrorPage from './ErrorPage';
import { Route, Switch } from 'react-router-dom';

export default function getThePage() {


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
          <Route exact path="/Forgot_account">
            <ForgotAccount />
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
          <Route exact path="/Post/:post_id">
            <SinglePost />
          </Route>
          <Route exact path="/">
            <MainPostPage />
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