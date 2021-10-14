import React from 'react';

const PetBox = (props) => {
  const {
    index,
    pet,
    currentProfile,
    otherUser,
    editPet,
    deletePet,
    uploadImage,
    validateField
  } = props.props;

  return (

    <div key={index + pet.petName} className="pet-box" pet={index}>

      <div className="pet-details-1">
        <div className="profile-detail-container" key={pet.petName}>
          <label>Name</label>
          <textarea type="text" name="pet-name" defaultValue={pet.petName} readOnly onKeyUp={event => validateField(event, "name")} />
          <p className="error-text">ㅤ</p>
        </div>
        <div className="profile-detail-container" key={pet.petType}>
          <label>Kind of Pet</label>
          <textarea type="text" name="pet-type" defaultValue={pet.petType} readOnly onKeyUp={event => validateField(event, "type")} />
          <p className="error-text">ㅤ</p>
        </div>
        <div className="profile-detail-container" key={pet.petBreed}>
          <label>Breed</label>
          <textarea type="text" name="pet-breed" defaultValue={pet.petBreed} readOnly onKeyUp={event => validateField(event, "breed")} />
          <p className="error-text">ㅤ</p>
        </div>
      </div>

      <div className="pet-details-2">
        <div className="profile-detail-container">
          <div className="pet-age-wrapper" key={pet.petAge}>
            <label className="pet-age-label">Age</label>
            <textarea className="pet-age-textarea" type="text" name="pet-age" defaultValue={pet.petAge} readOnly onKeyUp={event => validateField(event, "age")} />
            <p className="error-text">ㅤ</p>
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
          <textarea className="pet-about-textarea" type="text" name="pet-about" defaultValue={pet.about} readOnly onKeyUp={event => validateField(event, "about")} />
          <p className="error-text">ㅤ</p>
        </div>
      </div>

      <div className="pet-details-3">
        {!otherUser ? <>
          <div className="pet-button-holder">
            <button type="button" className="pet-edit button" petnum={index} onClick={() => editPet(index, pet._id)}>Edit</button>
            <button type="button" className="pet-delete button" onClick={() => deletePet(index)}>X</button>
          </div>
        </>
          : null}

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
  );

};

export default PetBox;
