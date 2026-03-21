import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../pages/Login";
import SchoolAccount from "../pages/SchoolAccount";
import SchoolAdminDashboard from "../pages/SchoolAdminDashboard";
import AdmitStudent from "../pages/AdmitStudent";
import NewDepartment from "../pages/CreateDepartment";


function PrivateRoute({children}){
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;

}

export default function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createschool" element={ <SchoolAccount /> } />
            <Route path="/school" 
                element={<PrivateRoute> <SchoolAdminDashboard /> </PrivateRoute>} 
            />
            <Route path="/newdepartment" element={<PrivateRoute> <NewDepartment /></PrivateRoute>} />
            {/* <Route path="/admit" element={<PrivateRoute> <AdmitStudent /></PrivateRoute>} /> */}
        </Routes>
        </BrowserRouter>
    )
}