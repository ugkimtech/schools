import { useState, useContext, useEffect, Children } from 'react';
import APICall from '../api/api';

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
  FaSpider,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './assets/styles/SchoolAdminDashboard.css';
import { AuthContext } from '../contexts/AuthContext';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import StatCardsGrid from './components/StatCardsGrid';
import TableCard from './components/TableCard';
import Events from './components/Events';
import PerformanceSummary from './components/PerformanceSummary';
import Page from './components/Page';
import Spiner from './components/Spiner';
import Sidebar from './components/SideBar';


const SchoolAdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/school' },
    { label: 'Students', icon: <FaUserGraduate />, path: '#' },
    { label: 'Staff', icon: <FaUsers />, path: '#' },
    { label: 'Departments', icon: <FaLayerGroup />, path: '#' },
    { label: 'Classes', icon: <FaBookOpen />, path: '#' },
    { label: 'Timetable', icon: <FaClipboardList />, path: '#' },
    { label: 'Examinations', icon: <FaMedal />, path: '#' },
    { label: 'Results', icon: <FaChartBar />, path: '#' },
    { label: 'Attendence', icon: <FaCalendarCheck />, path: '#' },
    { label: 'Finance', icon: <FaMoneyBillWave />, path: '#' },
    { label: 'School Inventory', icon: <FaBriefcase />, path: '#' },
    { label: 'Communications', icon: <FaEnvelope />, path: '#' },
    { label: 'Users & Permissions', icon: <FaUserCircle />, path: '#' },
    { label: 'Settings', icon: <FaCog />, path: '#' },
  ]

  useEffect(() => {
    if (!user) navigate('/login');
    const api = new APICall();
    const getSchoolProfile = async () => {
      const school = await api.get('school/my-school/');
      setProfile(school[0]);
    }
    getSchoolProfile();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle resize events
  useEffect(() => {
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

  const components = [
    <TableCard />, <Events />
  ]

  if (profile) {
    return (
      <>
        <Page sideBar={{ menuItems: menuItems, profile: {}, title: '' }} topBar={true} components={components} />
      </>
    );
  };
}

export default SchoolAdminDashboard;