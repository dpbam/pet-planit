import React, { useState } from 'react';
import $ from 'jquery';

// TODO add interests

const Profile = (props) => {

  const {
    username,
    firstName,
    lastName,
    email,
    zipcode,
    image,
    pets,
    posts
  } = props.profile;

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPet, setEditingPet] = useState(false);
  const [statePets, setPets] = useState(pets);


  const editProfile = () => {
    setEditingProfile(!editingProfile);
    // TODO add logic for graphql mutation to update profile
  }

  const editPet = (petnum) => {
    setEditingPet(!editingPet);
    let pets = $(document.getElementsByClassName("pet-box"));
    let petEditButtons = $(document.getElementsByClassName("pet-edit"));
    let currentPetButton = $(petEditButtons[petnum]);

    let petPlayButtons = $(document.getElementsByClassName("pet-play-button"));

    $.each(petPlayButtons, (index, button) => {
      if (Number($(button).attr('pet')) === petnum) {
        $(button).attr('disabled', !$(button).is('[disabled]')); // flips the editability of the radial buttons
      }
    });

    let pet = $(pets[petnum]);
    let textAreas = pet.find('textarea');

    $.each(textAreas, (index, area) => {
      $(area).attr('readonly', !$(area).is('[readonly]')); // flips the editability of the input fields
    });

    if (currentPetButton.hasClass("pet-save")) {
      currentPetButton.removeClass('pet-save');
      currentPetButton.text('Edit');
    } else {
      currentPetButton.addClass('pet-save');
      currentPetButton.text('Save');
    }

    // TODO add logic for graphql mutation to update pets
  }

  const deletePet = (petnum) => {
    if (petnum > -1) {
      let tempArr = [];
      for( var i = 0; i < statePets.length; i++){ 
                                   
        if (i !== petnum) { 
          tempArr.push(statePets[i]);
        }
    }
      setPets(tempArr);
    }

    // TODO add logic for graphql mutation to update pets
  }

  const addPet = () => {
    let tempArr = [...statePets]; // Have to use the spread operator so it creates a new reference. aka without this it wont re-render on state change
    tempArr.push({
      name: "New Pet",
      type: "?",
      breed: "N/A",
      age: 0,
      about: "N/A",
      owner: "Timbo",
      playdate: false,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png"
    });
    setPets(tempArr);

    // TODO add logic for graphql mutation to update pets
  }

  return (
    <section id="profile-section">

      <h2>{username}'s Farm</h2>
      <div id="profile-details">
        <div id="profile-info">

          {editingProfile
            ?
            <>
              <div className="profile-details-holder">
                <div className="profile-detail-container">
                  <label>First name</label>
                  <textarea type="text" name="owner-fname" defaultValue={firstName} />
                </div>
                <div className="profile-detail-container">
                  <label>Last name</label>
                  <textarea type="text" name="owner-lname" defaultValue={lastName} />
                </div>
                <div className="profile-detail-container">
                  <label>Email</label>
                  <textarea type="text" name="owner-email" defaultValue={email} />
                </div>
                <div className="profile-detail-container">
                  <label>Zipcode</label>
                  <textarea type="text" name="owner-zipcode" defaultValue={zipcode} />
                </div>
              </div>


              <div className="profile-image-holder">
                <div className="profile-button-holder">
                  <button type="button" className="profile-edit profile-save button" onClick={editProfile}>Save</button>
                </div>
                <div className="profile-image-container">
                  <img src={image} alt={"Picture of " + username} />
                </div>
              </div>
            </>
            :
            <>
              <div className="profile-details-holder">
                <div className="profile-detail-container">
                  <label>First name</label>
                  <textarea type="text" name="owner-fname" defaultValue={firstName} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Last name</label>
                  <textarea type="text" name="owner-lname" defaultValue={lastName} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Email</label>
                  <textarea type="text" name="owner-email" defaultValue={email} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Zipcode</label>
                  <textarea type="text" name="owner-zipcode" defaultValue={zipcode} readOnly />
                </div>
              </div>


              <div className="profile-image-holder">
                <div className="profile-button-holder">
                  <button type="button" className="profile-edit button" onClick={editProfile}>Edit</button>
                </div>
                <div className="profile-image-container">
                  <img src={image} alt={"Picture of " + username} />
                </div>
              </div>
            </>}

        </div>

        <div id="profile-posts">
          <label>Posts</label>
          <div id="posts-container">
            <ul>
              {posts.map((post, index) => (
                <li className="profile-post" key={index}>
                  <a href="./">{post.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      <h2>Pets</h2>
      <form id="profile-pets">

        {statePets && statePets.map((pet, index) => (
          <div key={index + pet.name} className="pet-box" pet={index}>
            <div className="pet-details-1">

              <div className="profile-detail-container" key={pet.name}>
                <label>Name</label>
                <textarea type="text" name="pet-name" defaultValue={pet.name} readOnly />
              </div>

              <div className="profile-detail-container" key={pet.type}>
                <label>Kind of Pet</label>
                <textarea type="text" name="pet-type" defaultValue={pet.type} readOnly />
              </div>

              <div className="profile-detail-container" key={pet.breed}>
                <label>Breed</label>
                <textarea type="text" name="pet-breed" defaultValue={pet.breed} readOnly />
              </div>

            </div>

            <div className="pet-details-2">

              <div className="profile-detail-container">
                <div className="pet-age-wrapper" key={pet.age}>
                  <label className="pet-age-label">Age</label>
                  <textarea className="pet-age-textarea" type="text" name="pet-age" defaultValue={pet.age} readOnly />
                </div>
                <div className="pet-play-wrapper" key={pet.playdate}>
                  <label className="pet-playdate-label">Playdates?</label>

                  <div className="playdate-buttons">
                    <input type="radio" className="pet-play-button" pet={index} name={pet.name + "-playdate" + index} defaultChecked={pet.playdate} disabled={true} />Yes
                  </div>
                  <div className="playdate-buttons">
                    <input type="radio" className="pet-play-button" pet={index} name={pet.name + "-playdate" + index} defaultChecked={!pet.playdate} disabled={true} />No
                  </div>

                </div>
              </div>

              <div className="profile-detail-container about-container" key={pet.about}>
                <label className="pet-about-label">About me</label>
                <textarea className="pet-about-textarea" type="text" name="pet-about" defaultValue={pet.about} readOnly />
              </div>

            </div>

            <div className="pet-details-3">
              <div className="pet-button-holder">
                <button type="button" className="pet-edit button" petnum={index} onClick={() => editPet(index)}>Edit</button>
                <button type="button" className="pet-delete button" onClick={() => deletePet(index)}>X</button>
              </div>
              <div className="pet-image-container">
                <img src={pet.image} alt={username + "'s pet " + pet.type + " " + pet.name} />
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="pet-add button" onClick={addPet} >Add another pet</button>
      </form>
    </section >
  );

};

export default Profile;
