import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./assets/styles/SideBar.css";

export default function Sidebar({ menuItems=[], schoolProfile, title, userProfile, sidebarOpen, onCloseSidebar }) {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : 'closed'}`}>
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <div className="sidebar-header">
                        {
                            schoolProfile ? 
                            <div className="school-logo">
                                <div className="logo-icon">
                                    <img src={schoolProfile.badge} className='school-badge' alt='SchoolBadge' />
                                </div>
                                <div className="logo-text">
                                    <h2>{schoolProfile.school_name}</h2>
                                    <span>{title}</span>
                                </div>
                            </div> : ''
                        }
                        <button className="close-sidebar" onClick={onCloseSidebar}>
                            <FaTimes />
                        </button>
                    </div>
        
                    <div className="nav-section">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index} 
                                to={item.path} 
                                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => {
                                    if (window.innerWidth < 600) {
                                        onCloseSidebar();
                                    }
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
        
                    <div className="sidebar-footer">
                        {userProfile && (
                            <div className="admin-profile">
                                <div className="admin-avatar">
                                    {userProfile.photo ? 
                                        <img src={userProfile.photo} className="admin-avatar-img" alt="Admin" /> : 
                                        <div className="admin-avatar-initials">{userProfile.first_name[0]}</div>
                                    }
                                </div>
                                <div className="admin-info">
                                    <span className="admin-name">{userProfile.first_name + ' ' + userProfile.last_name}</span>
                                    <span className="admin-role">{user?.groups?.[0] || 'Admin'}</span>
                                </div>
                            </div>
                        )}
                        <button onClick={logout} className="logout-btn">
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>
        </div>
    );
}