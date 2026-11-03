
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ userId, onBack }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const API = "http://10.109.75.125:5000";

  // Load existing profile details
  useEffect(() => {
    axios
      .get(`${API}/profile/${userId}`)
      .then((response) => {
        const data = response.data;

        setName(data.name || "");
        setBio(data.bio || "");
        setSkills(data.skills || "");
        setContact(data.contact || "");
        setSocialLink(data.social_link || "");

        if (data.photo) {
          setPreview(`${API}/uploads/${data.photo}`);
        }

        setIsEditing(true);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setIsEditing(false);
        } else {
          console.log("Profile loading failed:", error);
        }
      });
  }, [userId]);

  // Select profile photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Save or update profile
  const handleProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("skills", skills);
    formData.append("contact", contact);
    formData.append("social_link", socialLink);

    if (photo) {
      formData.append("image", photo);
    }

    axios
      .post(`${API}/profile`, formData)
      .then((response) => {
        alert(response.data);
        setPhoto(null);
        setIsEditing(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Profile save failed");
      });
  };

  return (
    <div className="profile-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="manage-heading">
        <h1>{isEditing ? "Edit Profile" : "Manage Profile"}</h1>
        <p>Update your personal details in MyShowcase</p>
      </div>

      <div className="profile-box">
        <form onSubmit={handleProfile}>

          <div className="photo-upload">
            <label>Profile Photo</label>

            <input
              className="photo-input"
              type="file"
              accept="image/*"
              onChange={handlePhoto}
            />

            {preview && (
              <img
                className="photo-preview"
                src={preview}
                alt="Profile preview"
              />
            )}
          </div>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Bio</label>
          <textarea
            placeholder="Tell something about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          <label>Skills</label>
          <input
            type="text"
            placeholder="Example: Python, React, MySQL, HTML, CSS"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label>Contact</label>
          <input
            type="text"
            placeholder="Enter your contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <label>Social Link</label>
          <input
            type="url"
            placeholder="Enter your social profile link"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
          />

          <button className="save-button" type="submit">
            {isEditing ? "Update Profile" : "Save Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;
