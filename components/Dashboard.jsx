
import React from "react";

function Dashboard({
  onProfile,
  onProjects,
  onActivities,
  onManageProfile,
  onManageProjects,
  onManageActivities,
  onShowShowcase,
  onLogout
}) {
  return (
    <div className="dashboard-page">

      <div className="dashboard-sidebar">

        <div className="dashboard-logo">
  <div className="logo-icon">🏆</div>
  <h2>My<span>Showcase</span></h2>
</div>

        <button onClick={onProfile}>
          PROFILE
        </button>

        <button onClick={onProjects}>
          PROJECTS
        </button>

        <button onClick={onActivities}>
          ACTIVITIES
        </button>

        <button
          className="view-button"
          onClick={onShowShowcase}
        >
          View My Showcase
        </button>

         

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

      <div className="dashboard-content">

        <h1>Welcome to MyShowcase</h1>

        <p>One Link. Always Updated.</p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>PROFILE</h3>
            <p>Manage your personal profile and information.</p>
            <button onClick={onManageProfile}>
              Manage Profile
            </button>
          </div>

          <div className="dashboard-card">
            <h3>PROJECTS</h3>
            <p>Add and display your projects in your showcase.</p>
            <button onClick={onManageProjects}>
              Add Project
            </button>
          </div>

          <div className="dashboard-card">
            <h3>ACTIVITIES</h3>
            <p>Add your events, competitions and workshops.</p>
            <button onClick={onManageActivities}>
              Add Activity
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
