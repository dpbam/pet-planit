import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <Link to="/">
        <h1>Pet Social Network</h1>
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to="/pawfeed">Pawfeed</Link>
            <Link to='/profile'>My Profile</Link>
            <Link to="/donate">Donate</Link>
            <a href='/' onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <a href="#about">About</a>
            <Link to="/signup">Sign-up</Link>
            <Link to="/login">Login</Link>
          </>
        )
        }
      </nav>
    </header>
  )
}

export default Header;
