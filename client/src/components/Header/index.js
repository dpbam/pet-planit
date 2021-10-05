import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Animal Farm</h1>
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            
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
