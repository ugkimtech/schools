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
  FaBook,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './assets/styles/SchoolAdminDashboard.css';
import { AuthContext } from '../contexts/AuthContext';
import Page from './components/Page';
import "../util/adminLogic.js";
import Form from './components/Form.jsx';
import StatCard from './components/StatCardsGrid.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Events from './components/Events.jsx';


export default function SchoolAdminDashboard() {

  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [staff, setStaff] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [classes, setClasses] = useState(null);
  const [students, setStudents] = useState(null);
  const [fees, setFees] = useState(null);
  const [staffAttendence, setStaffAttendence] = useState(null);
  const [studentAttendence, setStudentAttendence] = useState(null);
  const [events, setEvents] = useState(null);

  const navigate = useNavigate();
  const [components, setComponents] = useState([]);

  
  const api = new APICall();


  // const createStudent = async (data) => {
  //   const response = await api.create('students/manage-students/', data)
  //   if(response != 201) alert(`'admin:46',${response}`);
  // }

  const getSchoolProfile = async () => {
    try{
      const school = await api.get('school/my-school/');
      setProfile(school[0]);
    }catch(e){
      console.log(e);
    }
  }

  const getDepartments = async () => {
    try{
      const departmentsData = await api.get('departments/manage-departments/');
      setDepartments(departmentsData?departmentsData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getStaff = async () => {
    try{
      const staffData = await api.get('staff/manage-staff/');
      setStaff(staffData?staffData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getSubjects = async () => {
    try{
      const subjectsData = await api.get('academics/subjects/');
      setSubjects(subjectsData?subjectsData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getClasses = async () => {
    try{
      const classesData = await api.get('classes/manage-classes');
      setClasses(classesData?classesData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getStudents = async () => {
    try{
      const studentsData = await api.get('students/manage-students/');
      setStudents(studentsData?studentsData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getFees = async () => {
    try{
      const feesData = await api.get('fees/payments/');
      setFees(feesData?feesData:null);
    }catch(e){
      console.log(e);
    }
  }

  const getSudentAttendence = async () => {
    try{
      const attence = await api.get('attence/student/');
      setStudentAttendence(attence?attence:null);
    }catch(e){
      console.log(e);
    }
  }

  const getStaffAttendence = async () => {
    try{
      const attence = await api.get('attence/staff/');
      setStaffAttendence(attence?attence:null);
    }catch(e){
      console.log(e);
    }
  }

  const getEvents = async () => {
    try{
      const events = await api.get('events/manage-events/');
      setEvents(events?events:null);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    if (!user) navigate('/login');
    getSchoolProfile();
    getDepartments();
    getStaff();
    getSubjects();
    getClasses();
    getStudents();
    getFees();
    getSudentAttendence();
    getStaffAttendence();
    getEvents();
  }, []);

  useEffect(()=>{
    setComponents([
      <StatCard 
        data={[
          {icon:<FaMoneyBillWave />, title:'Fees Paid',value:fees?fees.length:0,state:'positive', comment:'Manage Fees'},
          {icon:<FaLayerGroup />, title:'Total Departments',value:departments?departments.length:0,state:'positive', comment:'Manage Department'},
          {icon:<FaUsers />, title:'Total Staff Members',value:staff?staff.length:0,state:'positive', comment:'Manage Staff'},
          {icon:<FaBook />, title:'Total Subjects Taught',value:subjects?subjects.length:0,state:'positive', comment:'Manage Subjects'},
          {icon:<FaBookOpen />, title:'Total Classes',value:classes?classes.length:0,state:'positive', comment:'Manage Classes'},
          {icon:<FaUserGraduate />, title:'Total Students',value:students?students.length:0,state:'positive', comment:'Manage Student'},
          {icon:<FaCalendarCheck />, title:'Students Attendence',value:studentAttendence?studentAttendence.length:0,state:'positive', comment:'View Students Attendence'},
          {icon:<FaCalendarCheck />, title:'Staff Attendence',value:staffAttendence?staffAttendence.length:0,state:'positive', comment:'View Staff Attendence'},
      ]} />,

      <Events 
        events={events?events:[]} />
    ]);
  },[]);

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/school' },
    { label: 'Students', icon: <FaUserGraduate />, path: '#' },
    { label: 'Staff', icon: <FaUsers />, path: '#' },
    { label: 'Departments', icon: <FaLayerGroup />, path: '/departments' },
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