import React from "react";

import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

const Home = () => {
  return (
    <main>
      <div className="hero">
        <div className="signup-form">
          <Signup />
        </div>
        {/* <Login /> */}
      </div>
      <div className="about">
        <h2 id="about">About</h2>
        <p>Doggo ipsum clouds such treat porgo wow such tempt yapper long water shoob blep thicc, very taste wow snoot doing me a frighten heckin bork extremely cuuuuuute. Super chub mlem super chub blep long bois, fat boi long doggo very jealous pupper boofers, extremely cuuuuuute bork mlem. Shibe clouds boof the neighborhood pupper, adorable doggo. Heckin angery woofer borkdrive tungg maximum borkdrive waggy wags, aqua doggo stop it fren ur givin me a spook. Smol doggo pupper, h*ck.</p>
      </div>
    </main>
  )
};

export default Home;
