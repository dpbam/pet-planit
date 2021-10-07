import React from 'react';


const Profile = (props) => {

  const {
    username,
    email,
    zipcode,
    image,
    pets,
    posts
  } = props.profile;


  return (
    <section id="profile-section">

      <h2>{username}'s Farm</h2>
      <div id="profile-details">
        <div id="profile-info">

          <div className="profile-details-holder">
            <div className="profile-detail-container">
              <label>Username</label>
              <textarea type="text" name="owner-name" defaultValue={username} readOnly />
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
              <button type="button" className="profile-edit button">Edit</button>
            </div>
            <div className="profile-image-container">
              <img src={image} alt={"Picture of " + username} />
            </div>
          </div>

        </div>

        <div id="profile-posts">
          <label>Posts</label>
          <div id="posts-container">
            <ul>
              {posts.map((post, index) => (
                <li className="profile-post">
                  <a href="./">{post.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      <h2>Pets</h2>
      <form id="profile-pets">
        {pets.map((pet, index) => (
          <div key={index} className="pet-box">
            <div className="pet-details-1">

              <div className="profile-detail-container">
                <label>Name</label>
                <textarea type="text" name="pet-name" defaultValue={pet.name} readOnly />
              </div>

              <div className="profile-detail-container">
                <label>Kind of Pet</label>
                <textarea type="text" name="pet-type" defaultValue={pet.type} readOnly />
              </div>

              <div className="profile-detail-container">
                <label>Breed</label>
                <textarea type="text" name="pet-breed" defaultValue={pet.breed} readOnly />
              </div>

            </div>

            <div className="pet-details-2">

              <div className="profile-detail-container">
                <div className="pet-age-wrapper">
                  <label className="pet-age-label">Age</label>
                  <textarea className="pet-age-textarea" type="text" name="pet-age" defaultValue={pet.age} readOnly />
                </div>
                <div className="pet-play-wrapper">
                  <label className="pet-playdate-label">Playdates?</label>

                  {pet.playdate
                    ?
                    <>
                      <div className="playdate-buttons">
                        <input type="radio" name={pet.name + "-playdate"} disabled={true} checked />Yes
                      </div>
                      <div className="playdate-buttons">
                        <input type="radio" name={pet.name + "-playdate"} disabled={true} />No
                      </div>
                    </>
                    :
                    <>
                      <div className="playdate-buttons">
                        <input type="radio" name={pet.name + "-playdate"} disabled={true} />Yes
                      </div>

                      <div className="playdate-buttons">
                        <input type="radio" name={pet.name + "-playdate"} disabled={true} checked />No
                      </div>
                    </>
                  }
                </div>
              </div>

              <div className="profile-detail-container about-container">
                <label className="pet-about-label">About me</label>
                <textarea className="pet-about-textarea" type="text" name="pet-about" defaultValue={pet.about} readOnly />
              </div>

            </div>

            <div className="pet-details-3">
              <div className="pet-button-holder">
                <button type="button" className="pet-edit button">Edit</button>
                <button type="button" className="pet-delete button">X</button>
              </div>
              <div className="pet-image-container">
                <img src={pet.image} alt={username + "'s pet " + pet.type + " " + pet.name} />
              </div>
            </div>
          </div>
        ))}


      </form>

    </section >
  );

};

export default Profile;
