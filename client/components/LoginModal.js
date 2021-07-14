import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const method = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email && evt.target.email.value;
    dispatch(authenticate(username, password, email, method));
  };

  const toggleModal = (type) => {
    setType(type ? type : '');
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Link to="" onClick={() => toggleModal('login')}>
        Login
      </Link>
      <Link to="" onClick={() => toggleModal('signup')}>
        Signup
      </Link>
      <div className={`modal ${isOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                {type === 'login' ? 'Log in' : 'Sign up'}
              </p>
            </header>
            <div className="card-content">
              <div className="columns">
                <form onSubmit={handleSubmit} name={type} className="column">
                  <label className="label" htmlFor="username">
                    <small>Username</small>
                  </label>
                  <input className="input" name="username" type="text" />
                  <label className="label" htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input className="input" name="password" type="password" />
                  {type === 'signup' ? (
                    <>
                      <label className="label" htmlFor="email">
                        <small>Email</small>
                      </label>
                      <input className="input" name="email" type="text" />
                    </>
                  ) : null}
                  <div className="field is-grouped">
                    <button className="button" type="submit">
                      {type === 'login' ? 'Log in' : 'Sign up'}
                    </button>
                  </div>

                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={toggleModal}
        ></button>
      </div>
    </div>
  );
};

export default LoginModal;
