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
          <ul>
            <li><Link to="/pawfeed">Pawfeed</Link></li>
            <li><Link to='/profile'>My Profile</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><a href='/' onClick={logout}>Logout</a></li>
          </ul>
        ) : (
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#">Sign-up / Login</a></li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header;
