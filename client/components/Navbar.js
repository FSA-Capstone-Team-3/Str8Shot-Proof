import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import LoginModal from './LoginModal';

const NavbarCustom = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <>
      <nav className='navbar has-shadow is-dark'>
        <div className='navbar-brand'>
          <a className='navbar-item'>
            <img
              src='Str8shot-logo.svg'
              alt='site logo'
              style={{ maxHeight: '100px' }}
            />
          </a>
        </div>

        <div className='navbar-item'>
          <Link to='/mystations'>My Stations</Link>
        </div>

        <div className='navbar-item'>
          <Link to='/explore'>Explore</Link>
        </div>

        <div className='navbar-menu' id='nav-links'>
          <div className='navbar-end'>
            {isLoggedIn ? (
              <div className='navbar-item'>
                {/* The navbar will show these links after you log in */}
                <a href='#' onClick={() => dispatch(logout())}>
                  Logout
                </a>
              </div>
            ) : (
              <div className="navbar-item">{<LoginModal />}</div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarCustom;
