import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_PROFILE, QUERY_USERS } from '../utils/queries';
import { UPDATE_USER, ADD_PET, DELETE_PET, UPDATE_PET } from '../utils/mutations';
import PetBox from '../components/PetBox';
import ProfileBox from '../components/ProfileBox';

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

  let otherUsername;
  let otherUser = false;
  if (props.location.state) {
    otherUsername = String(props.location.state.username);
    otherUser = true;
  }

  const [currentProfile, setCurrentProfile] = useState(exampleProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPet, setEditingPet] = useState(false);

  const loggedIn = Auth.loggedIn();

  const { loading } = useQuery(otherUsername ? QUERY_USERS : QUERY_ME_PROFILE, {
    variables: { username: otherUsername },
    onCompleted: data => { setCurrentProfile(otherUsername ? data.user : data.me) },
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

  // if (loading === true || currentProfile === undefined || currentProfile.username === "") {
  //   //return <div><h2>Loading</h2></div>;
  // }

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
  }
  console.log(currentProfile.posts);
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
    let $files = $(event);

    console.log('Uploading images to Imgur..');
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
        <ProfileBox props={{
          currentProfile: currentProfile,
          editingProfile: editingProfile,
          otherUser: otherUser,
          uploadImage: uploadImage,
          editProfile: editProfile
        }} />
        <div id="profile-posts">
          <label>Posts</label>
          <div id="posts-container">
            <ul>
              {currentProfile.posts.map((post, index) => (
                <li className="profile-post" key={index}>
                  <a href={"./pawfeed/" + post._id}>{post.postTitle}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h2>Pets</h2>
      <form id="profile-pets">
        {currentProfile.pets.map((pet, index) => (
          <PetBox props={{
            index: index,
            pet: pet,
            currentProfile: currentProfile,
            otherUser: otherUser,
            editPet: editPet,
            deletePet: deletePet,
            uploadImage: uploadImage
          }} key={index} />
        ))}
        {!otherUser ? <button type="button" className="pet-add button" onClick={addPet} >Add another pet</button> : null}
      </form>
    </section >
  );
};

export default Profile;
