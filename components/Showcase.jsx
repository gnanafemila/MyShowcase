
import React, { useState, useEffect } from "react";
import axios from "axios";

function Showcase({
  userId,
  onBack,
  onViewAllProjects,
  onViewAllActivities
}) {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://10.109.75.125:5000/projects/${userId}`)
      .then((response) => {
        if (
          response.data &&
          response.data !== "Failed to fetch projects"
        ) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://10.109.75.125:5000/activities/${userId}`)
      .then((response) => {
        if (
          response.data &&
          response.data !== "Failed to fetch activities"
        ) {
          setActivities(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const createLink = () => {
    const link = `${window.location.origin}/?id=${userId}`;

    window.prompt("Copy your MyShowcase link:", link);
  };

  return (
    <div className="showcase-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="showcase-heading">
        <h1>My Showcase</h1>
        <p>One Link. Always Updated.</p>

        {!window.location.search && (
          <button
            className="create-link-button"
            onClick={createLink}
          >
            Create Shareable Link
          </button>
        )}
      </div>

      {/* PROFILE */}

      <div className="showcase-section">

        <h2>Profile</h2>

        {profile ? (
          <div className="showcase-profile">

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

            <h3>{profile.name}</h3>

            <div className="showcase-details-card">

              <div className="showcase-detail">
                <h4>Bio</h4>
                <p>{profile.bio}</p>
              </div>

              <div className="showcase-detail">
                <h4>Skills</h4>
                <p>{profile.skills}</p>
              </div>

              <div className="showcase-detail">
                <h4>Contact</h4>
                <p>{profile.contact}</p>
              </div>

              {profile.social_link && (
                <div className="showcase-detail">
                  <h4>Social Profile</h4>
                  <a
                    href={profile.social_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Social Profile
                  </a>
                </div>
              )}

            </div>

          </div>
        ) : (
          <p>No profile added yet.</p>
        )}

      </div>

      {/* PROJECTS */}

      <div className="showcase-section">

        <div className="showcase-section-heading">
          <h2>Projects</h2>

          <button
            className="view-more-button"
            onClick={onViewAllProjects}
          >
            View More →
          </button>
        </div>

        {projects.length > 0 ? (

          <div className="showcase-projects">

            {projects.map((project) => (

              <div
                className="showcase-project-card"
                key={project.id}
              >

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

              </div>

            ))}

          </div>

        ) : (

          <p>No projects added yet.</p>

        )}

      </div>

      {/* ACTIVITIES */}

      <div className="showcase-section">

        <div className="showcase-section-heading">
          <h2>Activities</h2>

          <button
            className="view-more-button"
            onClick={onViewAllActivities}
          >
            View More →
          </button>
        </div>

        {activities.length > 0 ? (

          <div className="showcase-activities">

            {activities.map((activity) => (

              <div
                className="showcase-activity-card"
                key={activity.id}
              >

                {activity.image && (
                  <img
                    src={`http://10.109.75.125:5000/uploads/${activity.image}`}
                    alt={activity.title}
                    className="showcase-activity-image"
                  />
                )}

                <div className="showcase-activity-content">

                  <h3>{activity.title}</h3>

                  <p className="showcase-activity-date">
                    {activity.date}
                  </p>

                  <p>{activity.description}</p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p>No activities added yet.</p>

        )}

      </div>

    </div>
  );
}

export default Showcase;
