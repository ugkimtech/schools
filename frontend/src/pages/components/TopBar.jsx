import { FaBell, FaClock, FaBars, FaExclamationTriangle } from "react-icons/fa";
import ToggleTheme from "./Theme";
import "./assets/styles/TopBar.css";
import { useState } from "react";


export default function TopBar(sysAlerts, alerts){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <main className="main-content">
            <header className="dashboard-header">
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
                            
                {/* search bar */}
                <div className="header-search">
                    <input type="text" placeholder="Search..." />
                </div>
                
                <div className="header-actions">

                    {/* notification bell */}  
                    <button className="notification-btn">
                        <FaBell />
                        <span className="notification-badge"> 0 </span>
                    </button>

                    {/* date */}
                    <div className="header-date">
                        <FaClock />
                        <span>{new Date().toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                    {/* theme btn */}
                    <ToggleTheme />
                </div>
            </header>

            {/* welcome & system alerts */}
            <div className="welcome-section">
                <div className="welcome-text">
                    <h1>Welcome back</h1>
                    <p>Here's tody's overview...</p>
                </div>

                {/* {sysAlerts? <div className="alert-badge">
                        <FaExclamationTriangle />
                        <span>{sysAlerts.message} pending approvals..</span>
                    </div> :''
                    
                } */}
                
            </div>

            {/* Alerts Bar */}
            {alerts?
                <div className="alerts-bar">
                    {alerts.map((alert, index) => (
                        <div key={index} className={`alert-item ${alert.type}`}>
                            {alert.type === 'urgent' && <FaExclamationTriangle />}
                            {alert.type === 'warning' && <FaBell />}
                            {alert.type === 'info' && <FaClock />}
                            {alert.type === 'success' && <FaCheckCircle />}
                            <span>{alert.message}</span>
                            <small>{alert.time}</small>
                        </div>
                    ))}
                </div> :''
            }
        </main>
    );
}