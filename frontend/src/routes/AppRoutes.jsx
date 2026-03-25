import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../pages/Login";
import SchoolAccount from "../pages/SchoolAccount";
import AdmitStudent from "../pages/schoolAdmin/AdmitStudent";
import Staff from "../pages/schoolAdmin/Staff";
import Departments from "../pages/schoolAdmin/Departments";
import Layout from "../pages/schoolAdmin/Layout";
import Overview from "../pages/schoolAdmin/Overview";
import Classes from "../pages/schoolAdmin/Classes";
import Timetable from "../pages/schoolAdmin/Timetable";
import Examinations from "../pages/schoolAdmin/Examinations";
import Results from "../pages/schoolAdmin/Results";
import Attendence from "../pages/schoolAdmin/Attendence";
import Finance from "../pages/schoolAdmin/Finance";
import Inventory from "../pages/schoolAdmin/Inventory";
import Communications from "../pages/schoolAdmin/Communications";
import Permissions from "../pages/schoolAdmin/AccessPermissions";
import Settings from "../pages/schoolAdmin/Settings";


function PrivateRoute({children}){
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/" />;
}

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/createschool" element={ <SchoolAccount /> } />

                <Route path="/school"   
                    element={<PrivateRoute> <Layout /> </PrivateRoute>}>
                    <Route index element={<Overview />} />
                    <Route path="students" element={<AdmitStudent />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="classes" element={<Classes />} />
                    <Route path="timetable" element={<Timetable />} />
                    <Route path="examinations" element={<Examinations />} />
                    <Route path="results" element={<Results />} />
                    <Route path="attendence" element={<Attendence />} />
                    <Route path="finance" element={<Finance />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="communications" element={<Communications />} />
                    <Route path="permissions" element={<Permissions />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}