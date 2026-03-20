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
import Page from './components/Page';
import StatCardsGrid from './components/StatCardsGrid';
import Form from "./components/Form";


export default function SchoolAdminDashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    const api = new APICall();

    const getSchoolProfile = async () => {
      const school = await api.get('school/my-school/');
      setProfile(school[0]);
    }

    getSchoolProfile();
  }, []);

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

  const statData = [
  ]

  const components = [
  ]

  if (profile) {
    return (
      <>
        <Page sideBar={{ menuItems: menuItems, 
                          profile: profile, 
                          title: 'Admin' }} 
              topBar={true} 
              components={components} 
        />
      </>
    );
  };
}