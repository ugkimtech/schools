import { FaBell, FaClock, FaBars, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import ToggleTheme from "./Theme";
import "./assets/styles/TopBar.css";

export default function TopBar({ sysAlerts, alerts, onMenuToggle, sidebarOpen }) {
    return (
        <header className="dashboard-header">
            {/* Menu toggle button - only appears when sidebar is closed */}
            {!sidebarOpen && (
                <button className="menu-toggle" onClick={onMenuToggle}>
                    <FaBars />
                </button>
            )}
                        
            <div className="header-search">
                <input type="text" placeholder="Search..." />
            </div>
            
            <div className="header-actions">
                <button className="notification-btn">
                    <FaBell />
                    <span className="notification-badge">0</span>
                </button>

                <div className="header-date">
                    <FaClock />
                    <span>{new Date().toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}</span>
                </div>
                <ToggleTheme />
            </div>
        </header>
    );
}