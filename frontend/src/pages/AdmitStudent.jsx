import Form from "./components/Form";
import Page from "./components/Page";

export default function AdmitStudent(){
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

    components = [
        sideBar={menuItems:menuItems,profile:{},title:'Admin2'}
    ]
    return (
        <>
        <Page components={components} />
        </>
    );
}