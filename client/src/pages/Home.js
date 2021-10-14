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
        <p>Welcome to PET PLANiT! PET PLANiT is all about connecting pet parents and animal lovers. When you signup, you'll create a profile for yourself and your pet(s). Connect with other users on the pawfeed, where you can create posts sharing general information, adoptions, pet sitting, advice, set up playdates, post about lost pets, and reply to other users posts. Be sure to also check out the donate page where we have a few non-profit organizations listed that are doing incredible work for animals around the world and in our communities. Here at PET PLANiT, all pets are welcome, whether it's dogs, cats, hamsters, birds, or snakes, we're all connected by our love of our furry (or not so furry) friends.</p>
      </div>
    </main>
  )
};

export default Home;
