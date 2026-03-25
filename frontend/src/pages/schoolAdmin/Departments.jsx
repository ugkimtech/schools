export default function Departments(){
    return(
        <h1>Departments</h1>
    );
}












// import {
//     FaUsers,
//     FaBookOpen,
//     FaChartBar,
//     FaCog,
//     FaUserGraduate,
//     FaHome,
//     FaMoneyBillWave,
//     FaClipboardList,
//     FaEnvelope,
//     FaBriefcase,
//     FaMedal,
//     FaLayerGroup,
//     FaCalendarCheck,
//     FaUserCircle,
//     FaBook,
//     FaTable,
//   } from 'react-icons/fa';

// import { useContext, useEffect, useState } from "react";
// import Form from "./components/Form";
// import Page from "./components/Page";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import APICall from "../api/api";
// import TableCard from './components/TableCard';

// export default function Departments(){
//     const {user} = useContext(AuthContext);
//     const navigate = useNavigate();
    
//     const [departments, setDepartments] = useState(null);

//     const api = new APICall();

//     const getDepartments = async () => {
//         try{
//             const departmentsData = await api.get('departments/manage-departments/');
//             setDepartments(departmentsData?departmentsData:null);
//         }catch(e){
//             console.log(e);
//         }
//     }


//     const createDepartment = async (data) => {
//       const response = await api.create('departments/manage-departments/', data)
//       if(response != 201) alert(response);
//     }


//     useEffect(()=>{
//         !user ? navigate('/login') : navigate('/departments');
//         getDepartments();
//     }, []);
//     // Example:
//     // header={title:'Table', icon:<FaTable />, manage:true},
//     // columns=[{header:'Col 1', accessor:'one'}, {header:'Col 2', accessor:'two'}], 
//     // data=[{one:'Data 1', two:'Data 2'}, {one:'Data 3', two:'Data 4'}]

//     const components = [
//         <TableCard 
//             header={{title:'Departments', icon:<FaLayerGroup />, manage:true}}
//             columns={[{header:'Department Name', accessor:'dep_name'}, {header:'Department Head', accessor:'dep_head'}]}
//             data={departments?departments:['NA']}
//         />,

//         <Form form={{
//             title: 'Create A New Department', fields:[
//                 {field:'input', label:'Department Name', type:'text', name:'dep_name', placeholder:'Enter name of department'},
//                 {field:'dropdown', label:'Head of Department', name:'dep_head', options:[
//                     {value:'', option:'Select From Staff'}
//                 ]}
//             ],
//             button:{text: 'Create'}
//             }} onSubmit={createDepartment} />
//     ]


//     const menuItems = [
//         { label: 'Dashboard', icon: <FaHome />, path: '/school' },
//         { label: 'Students', icon: <FaUserGraduate />, path: '#' },
//         { label: 'Staff', icon: <FaUsers />, path: '/staff' },
//         { label: 'Departments', icon: <FaLayerGroup />, path: '/departments' },
//         { label: 'Classes', icon: <FaBookOpen />, path: '#' },
//         { label: 'Timetable', icon: <FaClipboardList />, path: '#' },
//         { label: 'Examinations', icon: <FaMedal />, path: '#' },
//         { label: 'Results', icon: <FaChartBar />, path: '#' },
//         { label: 'Attendence', icon: <FaCalendarCheck />, path: '#' },
//         { label: 'Finance', icon: <FaMoneyBillWave />, path: '#' },
//         { label: 'School Inventory', icon: <FaBriefcase />, path: '#' },
//         { label: 'Communications', icon: <FaEnvelope />, path: '#' },
//         { label: 'Users & Permissions', icon: <FaUserCircle />, path: '#' },
//         { label: 'Settings', icon: <FaCog />, path: '#' },
//     ]

//     return (
//         <Page
//         sideBar={{ 
//             menuItems: menuItems, 
//             // profile: profile, 
//             title: 'Admin' }} 
//             topBar={true} 
//             components={components} 
//         />
//     );
// }