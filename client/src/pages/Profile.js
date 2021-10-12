import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_PROFILE } from '../utils/queries';
import { UPDATE_USER, ADD_PET, DELETE_PET, UPDATE_PET } from '../utils/mutations';

// TODO add interests

const Profile = (props) => {

  const exampleProfile = {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    zipcode: "",
    image: "",
    pets: [],
    posts: []
  }

  const [currentProfile, setCurrentProfile] = useState(exampleProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPet, setEditingPet] = useState(false);


  const loggedIn = Auth.loggedIn();

  const { loading } = useQuery(QUERY_ME_PROFILE, {
    onCompleted: data => setCurrentProfile(data.me),
    fetchPolicy: "network-only"
  });


  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [addPetMutation] = useMutation(ADD_PET);
  const [deletePetMutation] = useMutation(DELETE_PET);
  const [updatePetMutation] = useMutation(UPDATE_PET, { refetchQueries: [{ query: QUERY_ME_PROFILE }] });

  const updateProfileDb = async (profile) => {
    const mutationResponse = await updateUserMutation({
      variables: {
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        zipcode: profile.zipcode,
        image: profile.image
      },
    });
  }

  if (loading === true || currentProfile === undefined || currentProfile.username === "") {
    //return <div><h2>Loading</h2></div>;
  }

  const newPetTemplate = {
    _id: "",
    petName: "New Pet",
    petType: "?",
    petBreed: "N/A",
    petAge: 1,
    about: "N/A",
    owner: currentProfile.username,
    playDate: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png"
  };



  const editProfile = () => {
    setEditingProfile(!editingProfile);
    if (editingProfile) {


      let profileSection = $(document.querySelector("#profile-info"));
      let profileImage = $(document.querySelector("#profile-image"));
      let textAreas = profileSection.find('textarea');
      let tempProfile = { ...currentProfile };

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
      tempProfile.image = profileImage.attr("src");
      setCurrentProfile(tempProfile);
      updateProfileDb(tempProfile);

    }
  }

  const editPet = async (petnum, petId) => {
    setEditingPet(!editingPet);

    let pets = $(document.getElementsByClassName("pet-box"));
    let petEditButtons = $(document.getElementsByClassName("pet-edit"));
    let petPlayButtons = $(document.getElementsByClassName("pet-play-button"));
    let petImgButtons = $(document.getElementsByClassName("pet-image-upload"));
    let petImages = $(document.getElementsByClassName("pet-image"));
    let currentPetButton = $(petEditButtons[petnum]);

    let pet = $(pets[petnum]);

    let textAreas = pet.find('textarea');

    let tempPet = { ...newPetTemplate };

    let updatedPetArr = [...currentProfile.pets];

    $.each(petPlayButtons, (index, button) => {
      if (Number($(button).attr('pet')) === petnum) {
        $(button).attr('disabled', !$(button).is('[disabled]')); // flips the editability of the radial buttons

        tempPet.playDate = !($(button).is(':checked')); // this runs twice (once for each button) so by setting the inverse we get the flipped value of the "no" button, which is the value of the "Yes" button
      }
    });

    $.each(petImgButtons, (index, button) => {


      if (Number($(button).attr('pet')) === petnum && $(button).css('display') === 'none') {
        $(button).show();
      } else if (Number($(button).attr('pet')) === petnum) {
        $(button).hide();
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
          tempPet.petName = $(area).val();
          break;
        case 1:
          tempPet.petType = $(area).val();
          break;
        case 2:
          tempPet.petBreed = $(area).val();
          break;
        case 3:
          tempPet.petAge = $(area).val();
          break;
        case 4:
          tempPet.about = $(area).val();
          break;
        default:
          console.log(index, $(area).val());
      }
    });


    tempPet._id = petId;

    if (currentPetButton.hasClass("pet-save")) { // when the user clicks save...
      currentPetButton.removeClass('pet-save');
      currentPetButton.text('Edit');
      updatedPetArr.splice(petnum, 1, tempPet); // replace old pet with new pet
      let tempProf = { ...currentProfile };
      tempProf.pets = [...updatedPetArr];
      setCurrentProfile(tempProf);

      const mutationResponse = await updatePetMutation({
        variables: {
          petId: petId,
          petName: tempPet.petName,
          petType: tempPet.petType,
          petAge: Number(tempPet.petAge),
          petBreed: tempPet.petBreed,
          about: tempPet.about,
          playDate: tempPet.playDate,
          image: tempPet.image
        }
      });
    } else {
      currentPetButton.addClass('pet-save');
      currentPetButton.text('Save');
    }

    // console.log(currentProfile.pets);
    // TODO add logic for graphql mutation to update pets
  }

  const deletePet = async (petnum) => {
    if (petnum > -1) {
      let tempArr = [];
      for (var i = 0; i < currentProfile.pets.length; i++) {

        if (i !== petnum) {
          tempArr.push(currentProfile.pets[i]);
        }
      }

      let tempProf = { ...currentProfile };
      tempProf.pets = tempArr;
      setCurrentProfile(tempProf);

      const mutationResponse = await deletePetMutation({
        variables: {
          petId: currentProfile.pets[petnum]._id
        },
      });
    }

    // TODO add logic for graphql mutation to update pets
  }

  const addPet = async () => {
    let tempArr = [...currentProfile.pets]; // Have to use the spread operator so it creates a new reference. aka without this it wont re-render on state change

    const mutationResponse = await addPetMutation({
      variables: {
        petName: newPetTemplate.petName,
        petType: newPetTemplate.petType,
        petAge: newPetTemplate.petAge,
        petBreed: newPetTemplate.petBreed,
        about: newPetTemplate.about,
        playDate: newPetTemplate.playDate,
        image: newPetTemplate.image
      },
    });
    if (mutationResponse) {
      let tempPet = { ...newPetTemplate };
      tempPet._id = mutationResponse.data.addPet._id;
      tempPet._typename = 'Pet';
      tempArr.push(tempPet);
      let tempProf = { ...currentProfile };
      tempProf.pets = [...tempArr];
      setCurrentProfile(tempProf);
    }
  }


  const uploadImage = async (event, profile, petNum) => {
    let profileImage = $(document.querySelector("#profile-image"));
    let petImages = $(document.getElementsByClassName("pet-image"));


    console.log('Uploading images to Imgur..');


    let $files = $(event);

    if ($files.length) {
      // Reject big files
      if ($files[0].size > $(this).data('max-size') * 1024) {
        console.log('Please select a smaller file');
        return false;
      }

      let apiUrl = 'https://api.imgur.com/3/image';
      let apiKey = 'dc0e01b32f67816'; // client id via the imgur application registration 

      let settings = {
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

      let formData = new FormData();
      formData.append('image', $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function (response) {
        let newPhotoData = (JSON.parse(response).data);
        console.log('Uploaded image: ', newPhotoData.link);

        if (profile) { // if we're uploading a profile picture...
          profileImage.attr("src", newPhotoData.link);
        } else { // if we're uploading a pet picture...
          $.each(petImages, (index, image) => {
            if (Number($(image).attr('pet')) === petNum) {

              image.src = newPhotoData.link;
            }
          });
        }
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
                  <input type="file" id="profile-upload" accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0], true)} />
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

        {currentProfile.pets.map((pet, index) => (
          <div key={index + pet.petName} className="pet-box" pet={index}>

            <div className="pet-details-1">
              <div className="profile-detail-container" key={pet.petName}>
                <label>Name</label>
                <textarea type="text" name="pet-name" defaultValue={pet.petName} readOnly />
              </div>
              <div className="profile-detail-container" key={pet.petType}>
                <label>Kind of Pet</label>
                <textarea type="text" name="pet-type" defaultValue={pet.petType} readOnly />
              </div>
              <div className="profile-detail-container" key={pet.petBreed}>
                <label>Breed</label>
                <textarea type="text" name="pet-breed" defaultValue={pet.petBreed} readOnly />
              </div>
            </div>

            <div className="pet-details-2">
              <div className="profile-detail-container">
                <div className="pet-age-wrapper" key={pet.petAge}>
                  <label className="pet-age-label">Age</label>
                  <textarea className="pet-age-textarea" type="text" name="pet-age" defaultValue={pet.petAge} readOnly />
                </div>
                <div className="pet-play-wrapper" key={pet.playDate}>
                  <label className="pet-playdate-label">Playdates?</label>
                  <div className="playdate-buttons">
                    <input type="radio" className="pet-play-button" pet={index} name={pet.petName + "-playdate" + index} defaultChecked={pet.playDate} disabled={true} />Yes
                  </div>
                  <div className="playdate-buttons">
                    <input type="radio" className="pet-play-button" pet={index} name={pet.petName + "-playdate" + index} defaultChecked={!pet.playDate} disabled={true} />No
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
                <button type="button" className="pet-edit button" petnum={index} onClick={() => editPet(index, pet._id)}>Edit</button>
                <button type="button" className="pet-delete button" onClick={() => deletePet(index)}>X</button>
              </div>
              <div className="pet-image-upload" style={{ display: 'none' }} pet={index}>
                <input type="file" id={"pet-upload-" + index} accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0], false, index)} />
                <button type="button" className="pet-pic-button">
                  <label htmlFor={"pet-upload-" + index}>Upload</label>
                </button>
              </div>
              <div className="pet-image-container">
                <img className="pet-image" pet={index} src={pet.image} alt={currentProfile.username + "'s pet " + pet.petType + " " + pet.petName} />
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
