import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    let relativeUrl = window.location.pathname.substring(1);
    if (relativeUrl === "") {
      relativeUrl = window.location.hash;
    }
    setActiveNav(relativeUrl)
  }, [activeNav]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      {Auth.loggedIn() ? (
        <Link to="/pawfeed" className="site-name" onClick={() => setActiveNav("pawfeed")}>
          Pet Social Network
        </Link>
      ) : (
        <Link to="/" className="site-name">
          Pet Social Network
        </Link>
      )}
      
      <nav>
        {Auth.loggedIn() ? (
          <ul>
            <li><Link to="/pawfeed" className={activeNav === "pawfeed" ? "active" : ""} onClick={() => setActiveNav("pawfeed")}>Pawfeed</Link></li>
            <li><Link to="/profile" className={activeNav === "profile" ? "active" : ""} onClick={() => setActiveNav("profile")}>My Profile</Link></li>
            <li><Link to="/donate" className={activeNav === "donate" ? "active" : ""} onClick={() => setActiveNav("donate")}>Donate</Link></li>
            <li><a href='/' onClick={logout}>Logout</a></li>
          </ul>
        ) : (
          <ul>
            <li><a href="#about" className={activeNav === "#about" ? "active" : ""} onClick={() => setActiveNav("#about")}>About</a></li>
            <li><a href="/#" className={activeNav === "" ? "active" : ""} onClick={() => setActiveNav("signup")}>Sign-up / Login</a></li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header;
