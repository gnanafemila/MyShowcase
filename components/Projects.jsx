import React, { useState } from "react";
import axios from "axios";

function Projects({ userId, onBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const handleProject = (e) => {
    e.preventDefault();

    axios
      .post("http://10.109.75.125:5000/projects", {
        user_id: userId,
        title: title,
        description: description,
        project_link: projectLink
      })
      .then((response) => {
        alert(response.data);

        setTitle("");
        setDescription("");
        setProjectLink("");
      })
      .catch((error) => {
        console.log(error);
        alert("Project save failed");
      });
  };

  return (
    <div className="manage-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="manage-heading">
        <h1>Add Project</h1>
        <p>Add a project to your MyShowcase profile</p>
      </div>

      <div className="manage-card">

        <form onSubmit={handleProject}>

          <label>Project Title</label>

          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Project Description</label>

          <textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Project Link</label>

          <input
            type="url"
            placeholder="Enter project link"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />

          <button className="save-button" type="submit">
            Add Project
          </button>

        </form>

      </div>

    </div>
  );
}

export default Projects;