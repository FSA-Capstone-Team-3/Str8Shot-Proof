import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import Welcome from './components/Welcome';
import MyStations from './components/MyStations';
import Explore from './components/Explore';
import { me } from './store';

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/mystations">
            <MyStations />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Redirect to="/mystations" />
        </Switch>
      ) : (
        <>
          <Switch>
            <Route path="/" exact>
              <AuthForm name="login" displayName="Login" />
            </Route>
            <Route path="/login">
              <AuthForm name="login" displayName="Login" />
            </Route>
            <Route path="/signup">
              <AuthForm name="signup" displayName="Sign Up" />
            </Route>
          </Switch>
          <Welcome />
        </>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
