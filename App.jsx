
import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import ProfileView from "./components/ProfileView";
import ProjectView from "./components/ProjectView";
import Activities from "./components/Activities";
import ActivityView from "./components/ActivityView";
import Showcase from "./components/Showcase";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const [showProfile, setShowProfile] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  const [showProfileView, setShowProfileView] = useState(false);
  const [showProjectView, setShowProjectView] = useState(false);
  const [showActivityView, setShowActivityView] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  // View More navigation
  const [viewMorePage, setViewMorePage] = useState("");

  const [userId, setUserId] = useState("");

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("myshowcase-theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme + "-theme");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("myshowcase-theme", newTheme);
  };

  // Global theme button
  const renderPage = (page) => (
    <>
      <button
        className="global-theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {page}
    </>
  );

  const searchParams = new URLSearchParams(window.location.search);
  const showcaseId = searchParams.get("id");

  // Public Showcase - View More pages
  if (showcaseId && viewMorePage === "projects") {
    return renderPage(
      <ProjectView
        userId={showcaseId}
        isOwner={false}
        onBack={() => setViewMorePage("")}
      />
    );
  }

  if (showcaseId && viewMorePage === "activities") {
    return renderPage(
      <ActivityView
        userId={showcaseId}
        isOwner={false}
        onBack={() => setViewMorePage("")}
      />
    );
  }

  // Public Showcase
  if (showcaseId) {
    return renderPage(
      <Showcase
        userId={showcaseId}
        onBack={() => window.history.back()}
        onViewAllProjects={() => setViewMorePage("projects")}
        onViewAllActivities={() => setViewMorePage("activities")}
      />
    );
  }

  // Logout
  const handleLogout = () => {
    setUserId("");
    setShowDashboard(false);
    setShowProfile(false);
    setShowProjects(false);
    setShowActivities(false);
    setShowProfileView(false);
    setShowProjectView(false);
    setShowActivityView(false);
    setShowShowcase(false);
    setViewMorePage("");
    setShowRegister(false);
  };

  // Owner - View More Projects
  if (viewMorePage === "projects") {
    return renderPage(
      <ProjectView
        userId={userId}
        isOwner={true}
        onBack={() => setViewMorePage("")}
      />
    );
  }

  // Owner - View More Activities
  if (viewMorePage === "activities") {
    return renderPage(
      <ActivityView
        userId={userId}
        isOwner={true}
        onBack={() => setViewMorePage("")}
      />
    );
  }

  // Owner Showcase
  if (showShowcase) {
    return renderPage(
      <Showcase
        userId={userId}
        onBack={() => setShowShowcase(false)}
        onViewAllProjects={() => setViewMorePage("projects")}
        onViewAllActivities={() => setViewMorePage("activities")}
      />
    );
  }

  // Activity View
  if (showActivityView) {
    return renderPage(
      <ActivityView
        userId={userId}
        onBack={() => setShowActivityView(false)}
      />
    );
  }

  // Profile View
  if (showProfileView) {
    return renderPage(
      <ProfileView
        userId={userId}
        onBack={() => setShowProfileView(false)}
      />
    );
  }

  // Project View
  if (showProjectView) {
    return renderPage(
      <ProjectView
        userId={userId}
        onBack={() => setShowProjectView(false)}
      />
    );
  }

  // Manage Activities
  if (showActivities) {
    return renderPage(
      <Activities
        userId={userId}
        onBack={() => setShowActivities(false)}
      />
    );
  }

  // Manage Profile
  if (showProfile) {
    return renderPage(
      <Profile
        userId={userId}
        onBack={() => setShowProfile(false)}
      />
    );
  }

  // Manage Projects
  if (showProjects) {
    return renderPage(
      <Projects
        userId={userId}
        onBack={() => setShowProjects(false)}
      />
    );
  }

  // Dashboard
  if (showDashboard) {
    return renderPage(
      <Dashboard
        onProfile={() => setShowProfileView(true)}
        onProjects={() => setShowProjectView(true)}
        onActivities={() => setShowActivityView(true)}
        onManageProfile={() => setShowProfile(true)}
        onManageProjects={() => setShowProjects(true)}
        onManageActivities={() => setShowActivities(true)}
        onShowShowcase={() => setShowShowcase(true)}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  // Register
  if (showRegister) {
    return renderPage(
      <Register
        onBack={() => setShowRegister(false)}
      />
    );
  }

  // Login
  return renderPage(
    <Login
      onRegister={() => setShowRegister(true)}
      onLogin={(id) => {
        setUserId(id);
        setShowDashboard(true);
      }}
    />
  );
}

export default App;
