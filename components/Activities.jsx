import React, { useState } from "react";
import axios from "axios";

function Activities({ userId, onBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const handleActivity = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);

    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://10.109.75.125:5000/activities", formData)
      .then((response) => {
        alert(response.data);

        setTitle("");
        setDescription("");
        setDate("");
        setImage(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Activity save failed");
      });
  };

  return (
    <div className="manage-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="manage-heading">
        <h1>Add Activity</h1>
        <p>Add an event, competition or workshop to your MyShowcase</p>
      </div>

      <div className="manage-card">

        <form onSubmit={handleActivity}>

          <label>Activity Title</label>

          <input
            type="text"
            placeholder="Enter activity title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>

          <textarea
            placeholder="Enter activity description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Upload Photo</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>

{image && (
  <img
    src={URL.createObjectURL(image)}
    alt="Preview"
    className="activity-preview"
  />
)}

          <button className="save-button" type="submit">
            Add Activity
          </button>

        </form>

      </div>

    </div>
  );
}

export default Activities;