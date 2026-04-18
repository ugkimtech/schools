import {
    FaUsers,
    FaBookOpen,
    FaChartBar,
    FaCog,
    FaUserGraduate,
    FaHome,
    FaMoneyBillWave,
    FaClipboardList,
    FaEnvelope,
    FaBriefcase,
    FaMedal,
    FaLayerGroup,
    FaCalendarCheck,
    FaUserCircle,
    FaBookReader,
} from 'react-icons/fa';

import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./assets/styles/Layout.css";
import Sidebar from '../components/SideBar.jsx';
import TopBar from '../components/TopBar.jsx';
import APICall from '../../api/api.js';
import { FaSchoolCircleCheck } from 'react-icons/fa6';

export default function Layout() {
    const [profile, setProfile] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const api = new APICall();

    const getSchoolProfile = async () => {
        try {
            const school = await api.get('school/my-school/');
            setProfile(school[0]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getSchoolProfile();

        const handleResize = () => {
            const isDesktop = window.innerWidth >= 600;
            setSidebarOpen(isDesktop);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const menuItems = [
        { label: 'Dashboard', icon: <FaHome />, path: '/school' },
        { label: 'Students', icon: <FaUserGraduate />, path: '/school/students' },
        { label: 'Staff', icon: <FaUsers />, path: '/school/staff' },
        { label: 'Departments', icon: <FaLayerGroup />, path: '/school/departments' },
        { label: 'Classes', icon: <FaBookOpen />, path: '/school/classes' },
        { label: 'Subjects', icon: <FaBookReader />, path: '/school/subjects' },
        { label: 'Examinations', icon: <FaMedal />, path: '/school/examinations' },
        { label: 'Timetable', icon: <FaClipboardList />, path: '/school/timetable' },
        { label: 'Results', icon: <FaChartBar />, path: '/school/results' },
        { label: 'Attendence', icon: <FaCalendarCheck />, path: '/school/attendence' },
        { label: 'Finance', icon: <FaMoneyBillWave />, path: '/school/finance' },
        { label: 'School Inventory', icon: <FaBriefcase />, path: '/school/inventory' },
        { label: 'Communications', icon: <FaEnvelope />, path: '/school/communications' },
        { label: 'Users & Permissions', icon: <FaUserCircle />, path: '/school/permissions' },
        { label: 'Settings', icon: <FaCog />, path: '/school/settings' },
    ]

    return (
        <div className="dashboard-container">
            <Sidebar
                menuItems={menuItems}
                schoolProfile={profile ? profile : {}}
                title={'Admin'}
                sidebarOpen={sidebarOpen}
                onCloseSidebar={closeSidebar}
            />

            <main className="main-content">
                <TopBar
                    onMenuToggle={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                />

                <div className='outlet'>
                    <Outlet />
                </div>

            </main>

            {sidebarOpen && window.innerWidth < 600 && (
                <div className="sidebar-overlay" onClick={closeSidebar}></div>
            )}
        </div>
    );
}