import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
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
          <Route path="/home">
            <Home />
          </Route>
          <Redirect to="/home" />
        </Switch>
      ) : (
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
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
