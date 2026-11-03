
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProjectView({ userId, onBack, isOwner = true }) {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLink, setEditLink] = useState("");

  const API = "http://10.109.75.125:5000";

  useEffect(() => {
    axios
      .get(`${API}/projects/${userId}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditLink(project.project_link || "");
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    axios
      .put(`${API}/projects/${id}`, {
        user_id: userId,
        title: editTitle,
        description: editDescription,
        project_link: editLink
      })
      .then((response) => {
        alert(response.data);

        setProjects(
          projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  title: editTitle,
                  description: editDescription,
                  project_link: editLink
                }
              : project
          )
        );

        setEditingId(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Project update failed");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    axios
      .delete(`${API}/projects/${id}`)
      .then((response) => {
        alert(response.data);

        setProjects(
          projects.filter((project) => project.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Project delete failed");
      });
  };
const filteredProjects = projects.filter((project) =>
  `${project.title} ${project.description}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  return (
    <div className="project-view-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="project-heading">
        <h1>My Projects</h1>
        <p>Projects added to your MyShowcase profile</p>
      </div>
    {isOwner && (
  <div className="search-container">
    <input
      type="text"
      placeholder="🔍 Search projects..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
)}
      {filteredProjects.length > 0 ? (

        <div className="projects-grid">

         {filteredProjects.map((project) => (

            <div className="project-view-card" key={project.id}>

              {isOwner && editingId === project.id ? (

                <form onSubmit={(e) => handleUpdate(e, project.id)}>

                  <label>Project Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />

                  <label>Project Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  />

                  <label>Project Link</label>
                  <input
                    type="url"
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                  />

                  <button className="save-button" type="submit">
                    Update Project
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>

                </form>

              ) : (

                <>
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  )}

                  {isOwner && (
                    <>
                      <button
                        className="save-button"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>

              )}

            </div>

          ))}

        </div>

      ) : (

        <div className="empty-projects">
  <h3>
    {searchTerm.trim()
      ? "No Matching Projects Found"
      : "No Projects Found"}
  </h3>

  <p>
    {searchTerm.trim()
      ? "Try searching with a different keyword."
      : "Add a project to display it here."}
  </p>
</div>
      )}

    </div>
  );
}

export default ProjectView;
