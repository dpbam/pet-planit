import React, { useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const [activeNav, setActiveNav] = useState("signup");

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <Link to="/" className="site-name">
        Pet Social Network
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
            <li><a href="#about" className={activeNav === "about" ? "active" : ""} onClick={() => setActiveNav("about")}>About</a></li>
            <li><a href="/#" className={activeNav === "signup" ? "active" : ""} onClick={() => setActiveNav("signup")}>Sign-up / Login</a></li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header;
