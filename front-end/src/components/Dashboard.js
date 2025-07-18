import React from 'react';
import './Dashboard.css'; // We'll create this CSS file

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p className="dashboard-subtitle">Manage your account and activities</p>
      </header>
      
      <div className="dashboard-content">
        <section className="dashboard-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <p>No recent activity</p>
          </div>
        </section>
        
        <section className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn-primary">Edit Profile</button>
            <button className="btn-secondary">Settings</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;