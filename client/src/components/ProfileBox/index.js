import React from 'react';

const ProfileBox = (props) => {
  const {
    currentProfile,
    editingProfile,
    otherUser,
    uploadImage,
    editProfile
  } = props.props;

  return (
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
            {!otherUser ? <>
              <div className="profile-button-holder">
                <button type="button" className="profile-edit button" onClick={editProfile}>Edit</button>
              </div>
            </> : null}
            <div className="profile-image-container">
              <img src={currentProfile.image} alt={"Picture of " + currentProfile.username} />
            </div>
          </div>
        </>}
    </div>
  );

};

export default ProfileBox;
