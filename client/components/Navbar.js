import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleLogout } from '../store';

const NavbarCustom = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <>
      <nav className="navbar has-shadow">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img
              src="8logo.png"
              alt="site logo"
              style={{ 'max-height': '70px' }}
            />
          </a>
        </div>
        <div className="navbar-item">
          <h1>Str8Shot</h1>
        </div>

        <div className="navbar-menu" id="nav-links">
          <div className="navbar-end">
            "
            {isLoggedIn ? (
              <div className="navbar-item">
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={() => dispatch(handleLogout())}>
                  Logout
                </a>
              </div>
            ) : (
              <div className="navbar-item">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarCustom;
