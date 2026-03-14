import { useState, useContext, useEffect } from 'react';
import APICall from '../api/api';

import { 
  FaChalkboardTeacher,
  FaUsers, 
  FaBookOpen, 
  FaCalendarAlt, 
  FaChartBar, 
  FaCog,
  FaUserGraduate,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaHome,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
  FaClipboardList,
  FaEnvelope,
  FaBriefcase,
  FaMedal,
  FaTimes,
  FaBell,
  FaFileAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaLayerGroup,
  FaCalendarCheck,
  FaUserCircle,
  FaBars
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './assets/styles/SchoolAdminDashboard.css';
import ToggleTheme from './components/Theme';
import { AuthContext } from '../contexts/AuthContext';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import SmallCardsGrid from './components/StatCardsGrid';
import StatCardsGrid from './components/StatCardsGrid';
import ColumnGridLauyout from './components/ColumnGridLayout';
import TableCard from './components/TableCard';
import Spiner from './components/Spiner';
import Events from './components/Events';
import PerformanceSummary from './components/PerformanceSummary';


const SchoolAdminDashboard = () => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null); 
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
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(()=>{
    if(!user) navigate('/login');
    const api = new APICall();
    const getSchoolProfile = async ()=>{
      const school = await api.get('school/my-school/');
      setProfile(school[0]);
    }

    const getStudents = async () =>{
      const studentsData = await api.get('student/manage-students/');
      setStudents(studentsData);
    }
    getSchoolProfile();
    getStudents();
  }, []);
  
  
  
  // ************************************************************

const [department, setDep] = useState(null)
  // School stats
  const schoolStats = {
    totalStudents: 2450,
    totalTeachers: 128,
    totalStaff: 85,
    totalClasses: 48,
    averageAttendance: 94,
    monthlyRevenue: 1850000,
    pendingApprovals: 12,
    newAdmissions: 45,
    teacherLeave: 8,
    upcomingEvents: 6
  };

  // Department overview
  const departments = [
    { name: 'Science', teachers: 24, students: 620, hod: 'Dr. Sharma', performance: '92%' },
    { name: 'Mathematics', teachers: 18, students: 580, hod: 'Mr. Kumar', performance: '88%' },
    { name: 'Languages', teachers: 22, students: 540, hod: 'Ms. Patel', performance: '85%' },
    { name: 'Social Studies', teachers: 16, students: 490, hod: 'Mrs. Singh', performance: '87%' },
    { name: 'Computer Science', teachers: 12, students: 320, hod: 'Mr. Rao', performance: '94%' },
    { name: 'Arts & Sports', teachers: 14, students: 410, hod: 'Coach David', performance: '91%' }
  ];

  // Pending approvals
  const pendingApprovals = [
    { id: 1, type: 'Leave Request', user: 'Ms. Anita Sharma', role: 'Teacher', department: 'Science', duration: '3 days', priority: 'high' },
    { id: 2, type: 'Budget Approval', user: 'Mr. Raj Kumar', role: 'HOD', department: 'Mathematics', amount: '₹45,000', priority: 'medium' },
    { id: 3, type: 'New Admission', user: 'Rahul Verma', role: 'Student', class: '11A', fee: '₹35,000', priority: 'high' },
    { id: 4, type: 'Purchase Request', user: 'Ms. Priya Singh', role: 'Librarian', items: 'Books (50)', amount: '₹25,000', priority: 'low' },
    { id: 5, type: 'Event Approval', user: 'Mr. David', role: 'Sports Coach', event: 'Annual Sports Day', budget: '₹75,000', priority: 'medium' }
  ];

  // Today's schedule
  const todaySchedule = [
    { time: '8:30 AM', event: 'Morning Assembly', location: 'School Ground', with: 'All Staff' },
    { time: '10:00 AM', event: 'HOD Meeting', location: 'Conference Room', with: 'Department Heads' },
    { time: '12:00 PM', event: 'Parent Meeting', location: 'Office', with: 'Mrs. Gupta (Parent)' },
    { time: '2:00 PM', event: 'Budget Review', location: 'Finance Office', with: 'Accounts Team' },
    { time: '3:30 PM', event: 'PTA Meeting', location: 'Auditorium', with: 'PTA Members' }
  ];

  // Alerts & notifications
  const alerts = [
    { type: 'urgent', message: 'Teacher shortage: 3 classes without substitute', time: '10 min ago' },
    { type: 'warning', message: 'Fee collection due: 45 students pending', time: '1 hour ago' },
    { type: 'info', message: 'Board inspection scheduled for next week', time: '2 hours ago' },
    { type: 'success', message: 'Science fair registration closed: 120 participants', time: '3 hours ago' }
  ];

  // Quick stats for classes
  const classStats = [
    { class: '10A', attendance: 95, performance: 82, teacher: 'Mr. Kumar' },
    { class: '10B', attendance: 88, performance: 76, teacher: 'Mrs. Singh' },
    { class: '12A', attendance: 92, performance: 89, teacher: 'Dr. Sharma' },
    { class: '9A', attendance: 86, performance: 78, teacher: 'Ms. Patel' }
  ];

// ************************************************************************


  
const header={title:'students', icon:<FaUserCircle />, manage:true}
const columns=[
                {header:'St Name', accessor:'name'},
                {header:'Age', accessor:'age'},
                {header: 'Course', accessor: 'course'},
                {header: 'Semester', accessor: 'sem'},
              ]
const tdata=[
  {name:'kim', age:4, course:'f', sem:4},
  {name:'kimera', age:25, course:'cs', sem:43},
  {name:'df', age:425, course:'cffs', sem:94},
  {name:'fkgd', age:2755, course:'fkjccs', sem:656},
]

  if(profile){return (
      <div className="dashboard-container">
        <SideBar menuItems={menuItems} schoolProfile={profile} title={'Admin'} />
        
        <main className="main-content">
          <TopBar />

          {/* contents */}
          <StatCardsGrid data={[{title:'name'},{title:'name'},{title:'name'},{title:'name'}]} />

          {/* Main Dashboard Grid */}
          {/* <ColumnGridLauyout /> */}

          {/* <TableCard header={header} columns={columns} data={tdata} /> */}

          {/* <Events /> */}
          
          <PerformanceSummary />

          {/* <ColumnGridLauyout /> */}

          {/* Footer Stats */}
          <div className="dashboard-footer">
            <div className="footer-stat">
              <span>School Strength</span>
              <strong>2,450 Students</strong>
            </div>
            <div className="footer-stat">
              <span>Teacher-Student Ratio</span>
              <strong>1:19</strong>
            </div>
            <div className="footer-stat">
              <span>Today's Attendance</span>
              <strong>94% (2,303 present)</strong>
            </div>
            <div className="footer-stat">
              <span>Fee Collection</span>
              <strong>₹18.5L / ₹24L</strong>
            </div>
          </div>
        </main>
      </div>
    );
  };
}

export default SchoolAdminDashboard;


















// import { useState, useContext, useEffect } from 'react';
// import APICall from '../api/api';

// import { 
//   FaChalkboardTeacher,
//   FaUsers, 
//   FaBookOpen, 
//   FaCalendarAlt, 
//   FaChartBar, 
//   FaCog,
//   FaUserGraduate,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaArrowRight,
//   FaHome,
//   FaUserTie,
//   FaClock,
//   FaMoneyBillWave,
//   FaClipboardList,
//   FaEnvelope,
//   FaBriefcase,
//   FaMedal,
//   FaLayerGroup,
//   FaCalendarCheck,
//   FaUserCircle,
//   FaBars
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import './assets/styles/SchoolAdminDashboard.css';
// import ToggleTheme from './components/Theme';
// import { AuthContext } from '../contexts/AuthContext';
// import Sidebar from './components/SideBar';
// import TopBar from './components/TopBar';


// const SchoolAdminDashboard = () => {
//   const {user, logout} = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(!user) navigate('/login');
//     const api = new APICall();
//     const school = api.get('school/my-school/');
//     setProfile(school);
//   }, []);

//   const menuItems = [
//     {label: 'Dashboard', icon: <FaHome />, path: '#'},
//     {label: 'Students', icon: <FaUserGraduate />, path: '#'},
//     {label: 'Staff', icon: <FaUsers />, path: '#'},
//     {label: 'Departments', icon: <FaLayerGroup />, path: '#'},
//     {label: 'Classes', icon: <FaBookOpen />, path: '#'},
//     {label: 'Timetable', icon: <FaClipboardList />, path: '#'},
//     {label: 'Examinations', icon: <FaMedal />, path: '#'},
//     {label: 'Results', icon: <FaChartBar />, path: '#'},
//     {label: 'Attendence', icon: <FaCalendarCheck />, path: '#'},
//     {label: 'Finance', icon: <FaMoneyBillWave />, path: '#'},
//     {label: 'School Inventory', icon: <FaBriefcase />, path: '#'},
//     {label: 'Communications', icon: <FaEnvelope />, path: '#'},
//     {label: 'Users & Permissions', icon: <FaUserCircle />, path: '#'},
//     {label: 'Settings', icon: <FaCog />, path: '#'},
//   ]




//   // ************************************************************
  
// const [students, setStudents] = useState(null)
// const [teachers, setTeachers] = useState(null)
// const [department, setDep] = useState(null)
//   // School stats
//   const schoolStats = {
//     totalStudents: 2450,
//     totalTeachers: 128,
//     totalStaff: 85,
//     totalClasses: 48,
//     averageAttendance: 94,
//     monthlyRevenue: 1850000,
//     pendingApprovals: 12,
//     newAdmissions: 45,
//     teacherLeave: 8,
//     upcomingEvents: 6
//   };

//   // Department overview
//   const departments = [
//     { name: 'Science', teachers: 24, students: 620, hod: 'Dr. Sharma', performance: '92%' },
//     { name: 'Mathematics', teachers: 18, students: 580, hod: 'Mr. Kumar', performance: '88%' },
//     { name: 'Languages', teachers: 22, students: 540, hod: 'Ms. Patel', performance: '85%' },
//     { name: 'Social Studies', teachers: 16, students: 490, hod: 'Mrs. Singh', performance: '87%' },
//     { name: 'Computer Science', teachers: 12, students: 320, hod: 'Mr. Rao', performance: '94%' },
//     { name: 'Arts & Sports', teachers: 14, students: 410, hod: 'Coach David', performance: '91%' }
//   ];

//   // Pending approvals
//   const pendingApprovals = [
//     { id: 1, type: 'Leave Request', user: 'Ms. Anita Sharma', role: 'Teacher', department: 'Science', duration: '3 days', priority: 'high' },
//     { id: 2, type: 'Budget Approval', user: 'Mr. Raj Kumar', role: 'HOD', department: 'Mathematics', amount: '₹45,000', priority: 'medium' },
//     { id: 3, type: 'New Admission', user: 'Rahul Verma', role: 'Student', class: '11A', fee: '₹35,000', priority: 'high' },
//     { id: 4, type: 'Purchase Request', user: 'Ms. Priya Singh', role: 'Librarian', items: 'Books (50)', amount: '₹25,000', priority: 'low' },
//     { id: 5, type: 'Event Approval', user: 'Mr. David', role: 'Sports Coach', event: 'Annual Sports Day', budget: '₹75,000', priority: 'medium' }
//   ];

//   // Today's schedule
//   const todaySchedule = [
//     { time: '8:30 AM', event: 'Morning Assembly', location: 'School Ground', with: 'All Staff' },
//     { time: '10:00 AM', event: 'HOD Meeting', location: 'Conference Room', with: 'Department Heads' },
//     { time: '12:00 PM', event: 'Parent Meeting', location: 'Office', with: 'Mrs. Gupta (Parent)' },
//     { time: '2:00 PM', event: 'Budget Review', location: 'Finance Office', with: 'Accounts Team' },
//     { time: '3:30 PM', event: 'PTA Meeting', location: 'Auditorium', with: 'PTA Members' }
//   ];

//   // Alerts & notifications
//   const alerts = [
//     { type: 'urgent', message: 'Teacher shortage: 3 classes without substitute', time: '10 min ago' },
//     { type: 'warning', message: 'Fee collection due: 45 students pending', time: '1 hour ago' },
//     { type: 'info', message: 'Board inspection scheduled for next week', time: '2 hours ago' },
//     { type: 'success', message: 'Science fair registration closed: 120 participants', time: '3 hours ago' }
//   ];

//   // Quick stats for classes
//   const classStats = [
//     { class: '10A', attendance: 95, performance: 82, teacher: 'Mr. Kumar' },
//     { class: '10B', attendance: 88, performance: 76, teacher: 'Mrs. Singh' },
//     { class: '12A', attendance: 92, performance: 89, teacher: 'Dr. Sharma' },
//     { class: '9A', attendance: 86, performance: 78, teacher: 'Ms. Patel' }
//   ];

// // ************************************************************************


  


//   if(profile){
//     return (
//       <div className="dashboard-container">
//         <Sidebar menuItems={menuItems} schoolProfile={profile} title={'Admin'} />
//         <TopBar />





        
//         <main className="main-content">
//           {/* Key Stats Grid */}
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon students">
//                 <FaUserGraduate />
//               </div>
//               <div className="stat-content">
//                 <h3>Total Students</h3>
//                 <div className="stat-value">{students?<>{students}</>:<>0</>}</div>
//                 {/* <span className="stat-change positive">+{schoolStats.newAdmissions} this month</span> */}
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon teachers">
//                 <FaChalkboardTeacher />
//               </div>
//               <div className="stat-content">
//                 <h3>Teachers</h3>
//                 <div className="stat-value">{teachers?<>{teachers}</>:0}</div>
//                 {/* <span className="stat-change warning">{schoolStats.teacherLeave} on leave</span> */}
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon staff">
//                 <FaUsers />
//               </div>
//               <div className="stat-content">
//                 <h3>Support Staff</h3>
//                 <div className="stat-value">{teachers?<>{teachers}</>:0}</div>
//                 <span className="stat-change">Across {department?<>{department}</>:0} departments</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon classes">
//                 <FaBookOpen />
//               </div>
//               <div className="stat-content">
//                 <h3>Classes</h3>
//                 <div className="stat-value">{schoolStats.totalClasses}</div>
//                 <span className="stat-change">Sections: 96</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon attendance">
//                 <FaCheckCircle />
//               </div>
//               <div className="stat-content">
//                 <h3>Avg. Attendance</h3>
//                 <div className="stat-value">{schoolStats.averageAttendance}%</div>
//                 <span className="stat-change positive">↑ 2% vs last week</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon revenue">
//                 <FaMoneyBillWave />
//               </div>
//               <div className="stat-content">
//                 <h3>Monthly Revenue</h3>
//                 <div className="stat-value">₹{(schoolStats.monthlyRevenue / 100000).toFixed(1)}L</div>
//                 <span className="stat-change positive">15% collected</span>
//               </div>
//             </div>
//           </div>

//           {/* Main Dashboard Grid */}
//           <div className="dashboard-grid">
//             {/* Left Column */}
//             <div className="grid-column">
//               {/* Pending Approvals Card */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaExclamationTriangle /> Pending Approvals</h3>
//                   <button className="view-all-btn">
//                     View All <FaArrowRight />
//                   </button>
//                 </div>
//                 <div className="approvals-list">
//                   {pendingApprovals.map(item => (
//                     <div key={item.id} className={`approval-item ${item.priority}`}>
//                       <div className="approval-icon">
//                         {item.type.includes('Leave') && <FaUserTie />}
//                         {item.type.includes('Budget') && <FaMoneyBillWave />}
//                         {item.type.includes('Admission') && <FaUserGraduate />}
//                         {item.type.includes('Purchase') && <FaBookOpen />}
//                         {item.type.includes('Event') && <FaCalendarAlt />}
//                       </div>
//                       <div className="approval-details">
//                         <div className="approval-title">{item.type}</div>
//                         <div className="approval-meta">
//                           <span>{item.user}</span>
//                           <span>• {item.role || item.class}</span>
//                           {item.department && <span>• {item.department}</span>}
//                           {item.amount && <span>• {item.amount}</span>}
//                         </div>
//                       </div>
//                       <div className="approval-actions">
//                         <button className="approve-btn">✓</button>
//                         <button className="reject-btn">✗</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Department Overview */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaLayerGroup /> Department Overview</h3>
//                   <button className="view-all-btn">
//                     Manage <FaArrowRight />
//                   </button>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="department-table">
//                     <thead>
//                       <tr>
//                         <th>Department</th>
//                         <th>Teachers</th>
//                         <th>Students</th>
//                         <th>HOD</th>
//                         <th>Performance</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {departments.map((dept, index) => (
//                         <tr key={index}>
//                           <td className="dept-name">{dept.name}</td>
//                           <td>{dept.teachers}</td>
//                           <td>{dept.students}</td>
//                           <td>{dept.hod}</td>
//                           <td>
//                             <span className={`badge ${parseInt(dept.performance) >= 90 ? 'success' : 'warning'}`}>
//                               {dept.performance}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Class Performance Snapshot */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaChartBar /> Class Performance Snapshot</h3>
//                   <button className="view-all-btn">
//                     Details <FaArrowRight />
//                   </button>
//                 </div>
//                 <div className="class-stats">
//                   {classStats.map((cls, index) => (
//                     <div key={index} className="class-stat-item">
//                       <div className="class-info">
//                         <span className="class-name">{cls.class}</span>
//                         <span className="class-teacher">{cls.teacher}</span>
//                       </div>
//                       <div className="class-metrics">
//                         <div className="metric">
//                           <span className="metric-label">Attendance</span>
//                           <div className="progress-bar">
//                             <div className="progress" style={{ width: `${cls.attendance}%` }}></div>
//                           </div>
//                           <span className="metric-value">{cls.attendance}%</span>
//                         </div>
//                         <div className="metric">
//                           <span className="metric-label">Performance</span>
//                           <div className="progress-bar">
//                             <div className="progress performance" style={{ width: `${cls.performance}%` }}></div>
//                           </div>
//                           <span className="metric-value">{cls.performance}%</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="grid-column">
//               {/* Today's Schedule */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaClock /> Today's Schedule</h3>
//                   <button className="view-all-btn">
//                     Full Day <FaArrowRight />
//                   </button>
//                 </div>
//                 <div className="schedule-list">
//                   {todaySchedule.map((item, index) => (
//                     <div key={index} className="schedule-item">
//                       <div className="schedule-time">{item.time}</div>
//                       <div className="schedule-content">
//                         <div className="schedule-title">{item.event}</div>
//                         <div className="schedule-meta">
//                           <span>{item.location}</span>
//                           <span>• {item.with}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3>Quick Actions</h3>
//                 </div>
//                 <div className="quick-actions-grid">
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">📝</div>
//                     <span>Announcement</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">💰</div>
//                     <span>Approve Budget</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">👥</div>
//                     <span>Staff Meeting</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">📊</div>
//                     <span>Generate Report</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">📧</div>
//                     <span>Send Notice</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">📅</div>
//                     <span>Create Event</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">✅</div>
//                     <span>Leave Approvals</span>
//                   </button>
//                   <button className="quick-action-btn">
//                     <div className="quick-icon">🏆</div>
//                     <span>Achievements</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Staff on Leave Today */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaUserTie /> Staff on Leave Today</h3>
//                   <span className="leave-count">{schoolStats.teacherLeave}</span>
//                 </div>
//                 <div className="leave-list">
//                   <div className="leave-item">
//                     <div className="leave-teacher">
//                       <div className="teacher-avatar">AS</div>
//                       <div>
//                         <div className="teacher-name">Ms. Anita Sharma</div>
//                         <div className="teacher-subject">Science (Class 10A)</div>
//                       </div>
//                     </div>
//                     <span className="leave-type sick">Sick Leave</span>
//                   </div>
//                   <div className="leave-item">
//                     <div className="leave-teacher">
//                       <div className="teacher-avatar">RK</div>
//                       <div>
//                         <div className="teacher-name">Mr. Raj Kumar</div>
//                         <div className="teacher-subject">Mathematics HOD</div>
//                       </div>
//                     </div>
//                     <span className="leave-type personal">Personal</span>
//                   </div>
//                   <div className="leave-item">
//                     <div className="leave-teacher">
//                       <div className="teacher-avatar">PV</div>
//                       <div>
//                         <div className="teacher-name">Mrs. Priya Verma</div>
//                         <div className="teacher-subject">English (Class 12B)</div>
//                       </div>
//                     </div>
//                     <span className="leave-type training">Training</span>
//                   </div>
//                   <div className="leave-item">
//                     <div className="leave-teacher">
//                       <div className="teacher-avatar">SD</div>
//                       <div>
//                         <div className="teacher-name">Mr. Sanjay Das</div>
//                         <div className="teacher-subject">Physical Education</div>
//                       </div>
//                     </div>
//                     <span className="leave-type duty">Official Duty</span>
//                   </div>
//                 </div>
//                 <button className="view-all-link">View All Staff Attendance →</button>
//               </div>

//               {/* Upcoming Events */}
//               <div className="dashboard-card">
//                 <div className="card-header">
//                   <h3><FaCalendarAlt /> Upcoming Events</h3>
//                   <span className="event-count">{schoolStats.upcomingEvents}</span>
//                 </div>
//                 <div className="events-mini-list">
//                   <div className="mini-event">
//                     <div className="event-date-mini">
//                       <span className="day">15</span>
//                       <span className="month">MAR</span>
//                     </div>
//                     <div className="event-info">
//                       <div className="event-title">Parent-Teacher Meeting</div>
//                       <div className="event-details">10:00 AM - Auditorium</div>
//                     </div>
//                   </div>
//                   <div className="mini-event">
//                     <div className="event-date-mini">
//                       <span className="day">18</span>
//                       <span className="month">MAR</span>
//                     </div>
//                     <div className="event-info">
//                       <div className="event-title">Science Exhibition</div>
//                       <div className="event-details">9:00 AM - Science Block</div>
//                     </div>
//                   </div>
//                   <div className="mini-event">
//                     <div className="event-date-mini">
//                       <span className="day">20</span>
//                       <span className="month">MAR</span>
//                     </div>
//                     <div className="event-info">
//                       <div className="event-title">Staff Development Day</div>
//                       <div className="event-details">2:00 PM - Conference Hall</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer Stats */}
//           <div className="dashboard-footer">
//             <div className="footer-stat">
//               <span>School Strength</span>
//               <strong>2,450 Students</strong>
//             </div>
//             <div className="footer-stat">
//               <span>Teacher-Student Ratio</span>
//               <strong>1:19</strong>
//             </div>
//             <div className="footer-stat">
//               <span>Today's Attendance</span>
//               <strong>94% (2,303 present)</strong>
//             </div>
//             <div className="footer-stat">
//               <span>Fee Collection</span>
//               <strong>₹18.5L / ₹24L</strong>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   };
// }

// export default SchoolAdminDashboard;