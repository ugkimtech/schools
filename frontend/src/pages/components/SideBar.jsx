import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaTimes, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./assets/styles/Sidebar.css";


export default function Sidebar({menuItems, schoolProfile, title, userProfile}){
    // dynamic menu, profile and menu title (user)
    const {user, logout} = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => window.innerWidth <= 1024 && setSidebarOpen(false);

    return (
        <>
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <nav className="sidebar-nav">
                    <div className="sidebar-header">
                        <div className="school-logo">
                            <div className="logo-icon">
                                <img src={schoolProfile.badge} className='school-badge' alt='SchoolBadge' />
                            </div>
                            <div className="logo-text">
                                <h2>{schoolProfile.school_name}</h2>
                                <span>{title}</span>
                            </div>
                        </div>
                        <button className="close-sidebar" onClick={toggleSidebar}>
                            <FaTimes />
                        </button>
                    </div>
        
                    <div className="nav-section">
                        {
                            menuItems.map((item, index)=> (
                                    <Link key={index} to={item.path} className="nav-item">{/*to add 'active' class*/}
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            )
                        }
                    </div>
        
                    <div className="sidebar-footer">
                        {userProfile ? <div className="admin-profile">
                            <div className="admin-avatar">
                                {userProfile.photo ? <img src={userProfile.photo} className="admin-avatar" />: <div className="admin-avatar">{userProfile.first_name[0]}</div>}
                            </div>
                            <div className="admin-info">
                                <span className="admin-name">{userProfile.first_name+' '+userProfile.last_name}</span>
                                <span className="admin-role">username.groups</span>
                            </div>
                        </div> : ''}
                        <button onClick={logout} className="logout-btn">
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>
            {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        </>
    );
}