import { useState, useContext, useEffect } from 'react';
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


const SchoolAdminDashboard = () => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {label: 'Dashboard', icon: <FaHome />, path: '#'},
    {label: 'Students', icon: <FaUserGraduate />, path: '#'},
    {label: 'Staff', icon: <FaUsers />, path: '#'},
    {label: 'Departments', icon: <FaLayerGroup />, path: '#'},
    {label: 'Classes', icon: <FaBookOpen />, path: '#'},
    {label: 'Timetable', icon: <FaClipboardList />, path: '#'},
    {label: 'Examinations', icon: <FaMedal />, path: '#'},
    {label: 'Results', icon: <FaChartBar />, path: '#'},
    {label: 'Attendence', icon: <FaCalendarCheck />, path: '#'},
    {label: 'Finance', icon: <FaMoneyBillWave />, path: '#'},
    {label: 'School Inventory', icon: <FaBriefcase />, path: '#'},
    {label: 'Communications', icon: <FaEnvelope />, path: '#'},
    {label: 'Users & Permissions', icon: <FaUserCircle />, path: '#'},
    {label: 'Settings', icon: <FaCog />, path: '#'},
  ]

  useEffect(()=>{
    if(!user) navigate('/login');
    const api = new APICall();
    const getSchoolProfile = async ()=>{
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

  if(profile){
    return (
      <div className="dashboard-container">
        <SideBar 
          menuItems={menuItems}
          schoolProfile={profile}
          title={'Admin'}
          sidebarOpen={sidebarOpen}
          onCloseSidebar={closeSidebar}
        />
        
        <main className="main-content">
          <TopBar 
            title='Dashboard'
            onMenuToggle={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
          <StatCardsGrid />
          <TableCard />
          <Events />
          <PerformanceSummary />
        </main>

        {/* Overlay for mobile */}
        {sidebarOpen && window.innerWidth < 600 && (
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}
      </div>
    );
  };
}

export default SchoolAdminDashboard;