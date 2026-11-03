import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileView({ userId, onBack }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`http://10.109.75.125:5000/profile/${userId}`)
      .then((response) => {
        if (
          response.data &&
          response.data !== "Failed to fetch profile"
        ) {
          setProfile(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div className="profile-view-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>Your personal showcase details</p>
      </div>

      {profile ? (

        <div className="profile-view-card">

          <div className="profile-avatar">
  {profile.photo ? (
    <img
      src={`http://10.109.75.125:5000/uploads/${profile.photo}`}
      alt="Profile"
      className="profile-view-photo"
    />
  ) : (
    profile.name.charAt(0).toUpperCase()
  )}
</div>

          <h2>{profile.name}</h2>

          <div className="profile-info">

            <div className="info-item">
              <h4>Bio</h4>
              <p>{profile.bio}</p>
            </div>

            <div className="info-item">
              <h4>Skills</h4>
              <p>{profile.skills}</p>
            </div>

            <div className="info-item">
              <h4>Contact</h4>
              <p>{profile.contact}</p>
            </div>

            <div className="info-item">
              <h4>Social Link</h4>
              <p>{profile.social_link}</p>
            </div>

          </div>

        </div>

      ) : (

        <div className="empty-profile">
          <h3>No Profile Found</h3>
          <p>Please use Manage Profile to add your details.</p>
        </div>

      )}

    </div>
  );
}

export default ProfileView;