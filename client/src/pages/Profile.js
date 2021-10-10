import React, { useState, useEffect } from 'react';
import $ from 'jquery';

// TODO add interests

const Profile = (props) => {

  const [currentProfile, setCurrentProfile] = useState(props.profile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPet, setEditingPet] = useState(false);
  const [statePets, setPets] = useState(currentProfile.pets);
  const [tempImage, setTempImage] = useState(currentProfile.image);

  let newPetTemplate = {
    name: "New Pet",
    type: "?",
    breed: "N/A",
    age: 0,
    about: "N/A",
    owner: currentProfile.username,
    playdate: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png"
  };

  useEffect(() => {
    let tempProf = currentProfile;
    tempProf.pets = statePets;
    setCurrentProfile(tempProf);
  }, [statePets]);

  const editProfile = () => {
    setEditingProfile(!editingProfile);

    console.log(currentProfile, tempImage);

    if (editingProfile) {


      let profileSection = $(document.querySelector("#profile-info"));
      let textAreas = profileSection.find('textarea');
      let tempProfile = {
        username: currentProfile.username,
        firstName: currentProfile.firstName,
        lastName: currentProfile.lastName,
        email: currentProfile.email,
        zipcode: currentProfile.zipcode,
        image: currentProfile.image,
        pets: statePets,
        posts: currentProfile.posts
      };

      $.each(textAreas, (index, area) => {
        $(area).attr('readonly', !$(area).is('[readonly]')); // flips the editability of the input fields
        switch (index) {
          case 0:
            tempProfile.firstName = $(area).val();
            break;
          case 1:
            tempProfile.lastName = $(area).val();
            break;
          case 2:
            tempProfile.email = $(area).val();
            break;
          case 3:
            tempProfile.zipcode = $(area).val();
            break;
          default:
            console.log(index, $(area).val());
        }
      });

      tempProfile.image = tempImage;
      // TODO add logic for graphql mutation to update profile

      setCurrentProfile(tempProfile);
    }
  }

  const editPet = (petnum) => {
    setEditingPet(!editingPet);

    let pets = $(document.getElementsByClassName("pet-box"));
    let petEditButtons = $(document.getElementsByClassName("pet-edit"));
    let petPlayButtons = $(document.getElementsByClassName("pet-play-button"));
    let petImages = $(document.getElementsByClassName("pet-image"));
    let currentPetButton = $(petEditButtons[petnum]);

    let pet = $(pets[petnum]);

    let textAreas = pet.find('textarea');

    let tempPet = newPetTemplate;
    let updatedPetArr = statePets;

    $.each(petPlayButtons, (index, button) => {
      if (Number($(button).attr('pet')) === petnum) {
        $(button).attr('disabled', !$(button).is('[disabled]')); // flips the editability of the radial buttons

        tempPet.playdate = !($(button).is(':checked')); // this runs twice (once for each button) so by setting the inverse we get the flipped value of the "no" button, which is the value of the "Yes" button
      }
    });


    $.each(petImages, (index, image) => {
      if (Number($(image).attr('pet')) === petnum) {

        tempPet.image = $(image)[0].currentSrc;
      }
    });


    $.each(textAreas, (index, area) => {
      $(area).attr('readonly', !$(area).is('[readonly]')); // flips the editability of the input fields
      switch (index) {
        case 0:
          tempPet.name = $(area).val();
          break;
        case 1:
          tempPet.type = $(area).val();
          break;
        case 2:
          tempPet.breed = $(area).val();
          break;
        case 3:
          tempPet.age = $(area).val();
          break;
        case 4:
          tempPet.about = $(area).val();
          break;
        default:
          console.log(index, $(area).val());
      }
    });

    if (currentPetButton.hasClass("pet-save")) { // when the user clicks save...
      currentPetButton.removeClass('pet-save');
      currentPetButton.text('Edit');
      updatedPetArr.splice(petnum, 1, tempPet); // replace old pet with new pet
      setPets(updatedPetArr);
    } else {
      currentPetButton.addClass('pet-save');
      currentPetButton.text('Save');
    }

    // console.log(statePets);
    // TODO add logic for graphql mutation to update pets
  }

  const deletePet = (petnum) => {
    if (petnum > -1) {
      let tempArr = [];
      for (var i = 0; i < statePets.length; i++) {

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
    tempArr.push(newPetTemplate);
    setPets(tempArr);

    // TODO add logic for graphql mutation to update pets
  }


  const uploadImage = (event) => {
    let profileImage = $(document.querySelector("#profile-image"));
    var $files = $(event);

    if ($files.length) {
      // Reject big files
      if ($files[0].size > $(this).data('max-size') * 1024) {
        console.log('Please select a smaller file');
        return false;
      }

      // Begin file upload
      console.log('Uploading file to Imgur..');

      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = 'dc0e01b32f67816';

      var settings = {
        async: true,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json',
        },
        mimeType: 'multipart/form-data',
        error: function (req, err) { console.log(req, err); }
      };

      var formData = new FormData();
      formData.append('image', $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function (response) {
        let newPhotoData = (JSON.parse(response).data);
        setTempImage(newPhotoData.link);
        profileImage.attr("src", newPhotoData.link);

        // TODO add logic for graphql mutation to update profile
      });
    }
  }


  return (
    <section id="profile-section">

      <h2>{currentProfile.username}'s Farm</h2>
      <div id="profile-details">
        <div id="profile-info">

          {editingProfile
            ?
            <>
              <div className="profile-details-holder">
                <div className="profile-detail-container">
                  <label>First name</label>
                  <textarea type="text" name="owner-fname" defaultValue={currentProfile.firstName} />
                </div>
                <div className="profile-detail-container">
                  <label>Last name</label>
                  <textarea type="text" name="owner-lname" defaultValue={currentProfile.lastName} />
                </div>
                <div className="profile-detail-container">
                  <label>Email</label>
                  <textarea type="text" name="owner-email" defaultValue={currentProfile.email} />
                </div>
                <div className="profile-detail-container">
                  <label>Zipcode</label>
                  <textarea type="text" name="owner-zipcode" defaultValue={currentProfile.zipcode} />
                </div>
              </div>


              <div className="profile-image-holder">
                <div className="profile-button-holder">
                  <button type="button" className="profile-edit profile-save button" onClick={editProfile}>Save</button>
                </div>
                <div className="profile-image-container">
                  <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} id="profile-image" />
                </div>
                <div className="profile-image-upload">
                  <input type="file" id="profile-upload" accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0])} />
                  <button type="button" id="profile-pic-button">
                    <label htmlFor="profile-upload">Upload</label>
                  </button>
                </div>
              </div>
            </>
            :
            <>
              <div className="profile-details-holder">
                <div className="profile-detail-container">
                  <label>First name</label>
                  <textarea type="text" name="owner-fname" defaultValue={currentProfile.firstName} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Last name</label>
                  <textarea type="text" name="owner-lname" defaultValue={currentProfile.lastName} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Email</label>
                  <textarea type="text" name="owner-email" defaultValue={currentProfile.email} readOnly />
                </div>
                <div className="profile-detail-container">
                  <label>Zipcode</label>
                  <textarea type="text" name="owner-zipcode" defaultValue={currentProfile.zipcode} readOnly />
                </div>
              </div>


              <div className="profile-image-holder">
                <div className="profile-button-holder">
                  <button type="button" className="profile-edit button" onClick={editProfile}>Edit</button>
                </div>
                <div className="profile-image-container">
                  <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} />
                </div>
              </div>
            </>}

        </div>

        <div id="profile-posts">
          <label>Posts</label>
          <div id="posts-container">
            <ul>
              {currentProfile.posts.map((post, index) => (
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
                <img className="pet-image" pet={index} src={pet.image} alt={currentProfile.username + "'s pet " + pet.type + " " + pet.name} />
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
