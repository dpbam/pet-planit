import React from 'react';

const ProfileBox = (props) => {
  const {
    currentProfile,
    editingProfile,
    otherUser,
    uploadImage,
    editProfile,
    validateField
  } = props.props;

  let tempValue;
  return (
    <div id="profile-info">
      {editingProfile
        ?
        <>
          <div className="profile-details-holder">
            <div className="profile-detail-container">
              <label>First name</label>
              <textarea type="text" name="owner-fname" defaultValue={currentProfile.firstName} onKeyUp={event => validateField(event, "name")} />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Last name</label>
              <textarea type="text" name="owner-lname" defaultValue={currentProfile.lastName} onKeyUp={event => validateField(event, "name")} />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Email</label>
              <textarea type="text" name="owner-email" defaultValue={currentProfile.email} onKeyUp={event => validateField(event, "email")} />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Zipcode</label>
              <textarea type="text" name="owner-zipcode" defaultValue={currentProfile.zipcode} onKeyUp={event => validateField(event, "zip")} />
              <p className="error-text">ㅤ</p>
            </div>
          </div>
          <div className="profile-image-holder">
            
            <div className="profile-image-container">
              <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} id="profile-image" />
            </div>
            <div className="image-upload-button-container">
              <div className="profile-image-upload">
                <input type="file" id="profile-upload" accept="image/*" style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0], true)} />
                <button type="button" id="profile-pic-button">
                  <label htmlFor="profile-upload">Upload</label>
                </button>
              </div>
              <div className="profile-button-holder">
                <button type="button" className="profile-edit profile-save button" onClick={editProfile}>Save</button>
              </div>
              </div>
          </div>
        </>
        :
        <>
          <div className="profile-details-holder">
            <div className="profile-detail-container">
              <label>First name</label>
              <textarea type="text" name="owner-fname" defaultValue={currentProfile.firstName} readOnly />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Last name</label>
              <textarea type="text" name="owner-lname" defaultValue={currentProfile.lastName} readOnly />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Email</label>
              <textarea type="text" name="owner-email" defaultValue={currentProfile.email} readOnly />
              <p className="error-text">ㅤ</p>
            </div>
            <div className="profile-detail-container">
              <label>Zipcode</label>
              <textarea type="text" name="owner-zipcode" defaultValue={currentProfile.zipcode} readOnly />
              <p className="error-text">ㅤ</p>
            </div>
          </div>
          <div className="profile-image-holder">
            <div className="profile-image-container">
              <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} />
            </div>
            {!otherUser ? <>
              <div className="profile-button-holder">
                <button type="button" className="profile-edit button" onClick={editProfile}>Edit</button>
              </div>
            </> : null}
            <div className="profile-image-container">
              <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} id="profile-image" />
            </div>
          </div>
        </>}
    </div>
  );

};

export default ProfileBox;
