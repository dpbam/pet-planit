import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to='/'>
          <h1>Pet Social Network</h1>
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>My Pet's Profile</Link>
              <a href='/' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
