import React, { useState } from "react";

import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {
  const [activeForm, setActiveForm] = useState("signin");
  return (
    <main className="content">
      <div className="hero">
        {activeForm === "signin" && (
          <div className="signup-form">
            <Signup />
            <p>Already a user? <span onClick={() => setActiveForm("login")}>Login {'>'}</span></p>
          </div>
        )}
        {activeForm === "login" && (
          <div className="login-form">
            <Login />
            <p>Don't have an account? <span onClick={() => setActiveForm("signin")}>Sign-up {'>'}</span></p>
          </div>
        )} 
      </div>
      <div className="about">
        <h2 id="about">About</h2>
        <p>Pet Planit is an app where users can sign up, then sign in and create a profile where they can add their pet(s) along with descriptions, photos, and pet friends. In addition, the user can organize playdates with other owners' pets, make posts about their pet in the pawfeed, and make donation to a local shelter.</p>
      </div>
    </main>
  )
};

export default Home;
