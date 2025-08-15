import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HomeIcon, PersonIcon, ListBulletIcon, ActivityLogIcon, ReaderIcon } from "@radix-ui/react-icons";
import Habits from "./Habits";
import "../Styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navigationItems = [
    { id: "progress", label: "Progress", icon: ActivityLogIcon },
    { id: "feed", label: "Feed", icon: ReaderIcon },
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "habits", label: "Habits", icon: ListBulletIcon },
    { id: "profile", label: "Profile", icon: PersonIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "progress":
        return <ProgressView />;
      case "feed":
        return <FeedView />;
      case "home":
        return <HomeView />;
      case "habits":
        return <HabitsView />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <h2>Steady</h2>
          </div>
          
          <NavigationMenu.Root className="top-nav">
            <NavigationMenu.List className="nav-list">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavigationMenu.Item key={item.id} className="nav-item">
                    <button
                      className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <IconComponent className="nav-icon" />
                      <span className="nav-label">{item.label}</span>
                    </button>
                  </NavigationMenu.Item>
                );
              })}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const HomeView = () => (
  <div className="view-container">
    <h2>Home</h2>
    <p>Your daily overview and quick actions.</p>
  </div>
);

const ProgressView = () => (
  <div className="view-container">
    <h2>Progress</h2>
    <p>Track your habit progress and analytics.</p>
  </div>
);

const FeedView = () => (
  <div className="view-container">
    <h2>Feed</h2>
    <p>Updates and social features.</p>
  </div>
);

const HabitsView = () => (
    <Habits />
);

const ProfileView = () => (
  <div className="view-container">
    <h2>Profile</h2>
    <p>Your account settings and preferences.</p>
  </div>
);

export default Dashboard;