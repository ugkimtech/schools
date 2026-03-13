import { AuthContext } from "../contexts/AuthContext.jsx";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./components/Theme.jsx";
import "./assets/styles/Login.css";
import APICall from "../api/api.js";

export default function Login(){
    
    const {user, login, apiError, setApiError} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [greeting, setGreating] = useState('');

    useEffect(()=>{
        groups(); // auto redirect on app refresh
        const now = new Date().getHours();
        if(now>=0 && now<=11){
            setGreating('Good Morning');
        }else if(now>=12 && now<=15){
            setGreating('Good Afternoon')
        }else{
            setGreating('Good Evening')
        }
    });

    // check user groups
    const groups = async ()=>{
        if(user){
            const api = new APICall();
            const userdata = await api.get(`user/getuser/${user.user_id}/`);
            if(userdata){
                console.log(userdata.groups[0])
                userdata.groups[0] === 'school'?navigate('/school'):alert(`No dashboard for ${userdata.groups[0]}`)
            }
        }
    };

    const handleLogin = async (e)=> {
        if(!(username || password)) {
            
            alert('Please fill in all fields.');
            return
        }
        e.preventDefault();
        const status = await login(username, password);
        if(status===200) groups();
    };

    return (
        <div className="login-screen" id="screen">
            <h4>{greeting}</h4>
            <ToggleTheme className="theme-icon" />
            <h2>Please Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                
                {apiError && <p className="error-msg">{apiError}</p>}
                <input type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e)=> {
                            setUsername(e.target.value);
                            setApiError('');
                        }} />

                <input type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e)=> {
                            setPassword(e.target.value);
                            setApiError('');
                        }} />
                
                <button type="submit">Login</button>
            </form>
            <p className="setup">No Account? <a><Link to="/createschool">Click here to Setup your school</Link></a></p>
        </div>
    );
}