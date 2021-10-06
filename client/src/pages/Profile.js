import React, { useState } from 'react';


const Profile = (props) => {

  const {
    username,
    email,
    zipcode,
    pets
  } = props.profile;

  console.log(username, email, zipcode, pets);

  return (
    <section id="profile-section">

      <div id="profile-details">
        <h2>{username}'s Farm</h2>
      </div>
      
      <div id="profile-posts">
        <h3>posts</h3>
      </div>

      <div id="profile-pets">
        <h2>Pets</h2>
        <div className="pet-box">

        </div>
      </div>

    </section>
  );

};

export default Profile;
