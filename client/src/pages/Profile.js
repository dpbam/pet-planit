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

      <h2>{username}'s Farm</h2>
      <div id="profile-details">
        <div id="profile-info">
          <div className="pet-detail-container">
            <label>Owner Name</label>
            <textarea type="text" name="owner-name" value={username} readonly />
          </div>
          <div className="pet-detail-container">
            <label>Email</label>
            <textarea type="text" name="owner-email" value={email} readonly />
          </div>
          <div className="pet-detail-container">
            <label>Zipcode</label>
            <textarea type="text" name="owner-zipcode" value={zipcode} readonly />
          </div>
        </div>

        <div id="profile-posts">
          <h3>posts</h3>
        </div>
      </div>


      <h2>Pets</h2>
      <form id="profile-pets">
        {pets.map((pet, index) => (
          <div key={index} className="pet-box">
            <div className="pet-details-1">

              <div className="pet-detail-container">
                <label>Pet Name</label>
                <textarea type="text" name="pet-name" value={pet.name} readonly />
              </div>

              <div className="pet-detail-container">
                <label>Kind of Pet</label>
                <textarea type="text" name="pet-type" value={pet.type} readonly />
              </div>

              <div className="pet-detail-container">
                <label>Breed</label>
                <textarea type="text" name="pet-breed" value={pet.breed} readonly />
              </div>

            </div>

            <div className="pet-details-2">
              
              <div className="pet-detail-container">
                <label>Age</label>
                <textarea type="text" name="pet-age" value={pet.age} readonly />
              </div>

              <div className="pet-detail-container about-container">
                <label className="pet-about-label">About me</label>
                <textarea className="pet-about-textarea" type="text" name="pet-about" value={pet.about} readonly />
              </div>

            </div>
          </div>
        ))}


      </form>

    </section>
  );

};

export default Profile;
