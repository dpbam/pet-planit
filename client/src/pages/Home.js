import React, { useState } from "react";

import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

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
        <p>Doggo ipsum clouds such treat porgo wow such tempt yapper long water shoob blep thicc, very taste wow snoot doing me a frighten heckin bork extremely cuuuuuute. Super chub mlem super chub blep long bois, fat boi long doggo very jealous pupper boofers, extremely cuuuuuute bork mlem. Shibe clouds boof the neighborhood pupper, adorable doggo. Heckin angery woofer borkdrive tungg maximum borkdrive waggy wags, aqua doggo stop it fren ur givin me a spook. Smol doggo pupper, h*ck. Pupper dat tungg tho puggo wrinkler corgo, wow such tempt many pats very good spot heck, doggorino pupper doggo. long bois boofers many pats. You are doing me the shock waggy wags clouds most angery pupper I have ever seen, big ol pupper you are doing me the shock. Pupper shibe heckin adorable doggo, heckin good boys and girls such treat adorable doggo, pupper ur givin me a spook. Wrinkler heckin angery woofer you are doing me the shock puggorino, shibe mlem. Wow very biscit ruff woofer, blep.</p>
      </div>
    </main>
  )
};

export default Home;
