
import React, { useState, useEffect } from "react";
import axios from "axios";

function ActivityView({ userId, onBack, isOwner = true }) {
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const baseURL = "http://10.109.75.125:5000";

  const fetchActivities = () => {
    axios
      .get(`${baseURL}/activities/${userId}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setActivities(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, [userId]);

  const handleEdit = (activity) => {
    setEditingId(activity.id);
    setTitle(activity.title);
    setDescription(activity.description);
    setDate(String(activity.date).slice(0, 10));
    setImage(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("user_id", userId);

    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`${baseURL}/activities/${editingId}`, formData)
      .then((response) => {
        alert(response.data);
        setEditingId(null);
        setImage(null);
        fetchActivities();
      })
      .catch((error) => {
        console.log(error);
        alert("Activity update failed");
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setImage(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    axios
      .delete(`${baseURL}/activities/${id}`)
      .then((response) => {
        alert(response.data);
        setActivities((previous) =>
          previous.filter((activity) => activity.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Activity delete failed");
      });
  };

  // Search activities by title and description
  const filteredActivities = activities.filter((activity) =>
    `${activity.title} ${activity.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="activity-view-page">

      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="activity-heading">
        <h1>My Activities</h1>
        <p>Events, competitions and workshops you've attended</p>
      </div>

      {/* Owner-only search bar */}
      {isOwner && (
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {filteredActivities.length > 0 ? (
        <div className="activities-grid">

          {filteredActivities.map((activity) => (
            <div className="activity-view-card" key={activity.id}>

              {activity.image && (
                <img
                  src={`${baseURL}/uploads/${activity.image}`}
                  alt={activity.title}
                  className="activity-image"
                />
              )}

              <div className="activity-content">

                {isOwner && editingId === activity.id ? (

                  <form onSubmit={handleUpdate}>

                    <h3>Edit Activity</h3>

                    <label>Activity Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <label>Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />

                    <label>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    <label>Change Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    <div className="activity-actions">
                      <button type="submit" className="save-button">
                        Update
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>

                  </form>

                ) : (

                  <>
                    <h3>{activity.title}</h3>

                    <p className="activity-date">
                      {String(activity.date).slice(0, 10)}
                    </p>

                    <p className="activity-description">
                      {activity.description}
                    </p>

                    {isOwner && (
                      <div className="activity-actions">

                        <button
                          className="edit-button"
                          onClick={() => handleEdit(activity)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(activity.id)}
                        >
                          Delete
                        </button>

                      </div>
                    )}
                  </>

                )}

              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="empty-activities">
          <h3>
            {searchTerm.trim()
              ? "No Matching Activities Found"
              : "No Activities Found"}
          </h3>

          <p>
            {searchTerm.trim()
              ? "Try searching with a different keyword."
              : "Add an event, competition or workshop to display it here."}
          </p>
        </div>
      )}

    </div>
  );
}

export default ActivityView;
