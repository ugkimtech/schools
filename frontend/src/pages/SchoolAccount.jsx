import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import APICall from "../api/api";
import "./assets/styles/SchoolAccount.css";


export default function SchoolAccount(){
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const create = async (e)=>{
        e.preventDefault();
        setError(null);

        const form = e.target
        const data = new FormData();
        const elements = form.querySelectorAll("input, select");
        elements.forEach((element)=>{
            if(!element.name) return;
            if(element.type === "file"){
                if(element.files.length > 0){
                    data.append(element.name, element.files[0]);
                }
            }else{
                data.append(element.name, element.value);
            }
        });

        const api = new APICall();
        const response = await api.create('school/create-school/', data);
        response === 201 ? alert('created'):setError(response);
    }

    return (
        <div className="school-account">
            <h2>STEP1: Create Account for your school</h2>
            <form onSubmit={create} encType="multipart/form-data" className="create-form">
                {error && <p className="error">{error}</p>}
                <label>School Name</label>
                <input type="text" 
                        placeholder="Name of the school" 
                        name="school_name"
                        required />

                <label>Username</label>
                <input type="text" 
                        placeholder="Username for login purpposes" 
                        name="username"
                        required
                         />

                <label>Password</label>
                <input type="password" 
                        placeholder="Admin password" 
                        name="password"
                        required
                         />

                <label>School Email</label>
                <input type="email" 
                        placeholder="Name of the school"
                        name="email"
                        required
                         />

                <label>School Motto</label>
                <input type="text" 
                        placeholder="The school motto" 
                        name="motto"
                         />

                <label>School Level</label>
                <select  name="level" required>
                    <option value="">Select level</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                </select>

                <label>Phone</label>
                <input type="text" 
                        placeholder="School phone number" 
                        name="phone"
                        required
                         />

                <label>School Address</label>
                <input type="text" 
                        placeholder="Scool address" 
                        name="address"
                         />

                <label>District</label>
                <input type="text" 
                        placeholder="District of location" 
                        name="district"
                         />
                
                <label>Region</label>
                <select name="region">
                    <option value="">Select region</option>
                    <option value="CENTRAL">Central</option>
                    <option value="EASTERN">Eastern</option>
                    <option value="NORTHERN">Northern</option>
                    <option value="SOUTHERN">Southern</option>
                    <option value="WESTERN">Western</option>
                </select>

                <label>Website (if any)</label>
                <input type="text" 
                        placeholder="School Website" 
                        name="website"
                         />

                <label>MoES Registration Number</label>
                <input type="text" 
                        placeholder="MoES Reg No." 
                        name="reg_number"
                         />

                <label>School Ownership</label>
                <select name="ownership">
                    <option value="">Select Ownership</option>
                    <option value="PRIVATE">Private</option>
                    <option value="GOVERNMENT">Government</option>
                    <option value="OTHERS">Others</option>
                </select>

                <label>UNEB Center Number (if any)</label>
                <input type="text" 
                        placeholder="UNEB Center Number" 
                        name="UNEB_No"
                         />

                <label>School Badge</label>
                <input type="file" 
                        name="badge" />

                <button type="submit">Create</button>
            </form>
            <p className="setup">Do you have an Account? <a><Link to="/login">Click here to Login</Link></a></p>
        </div>
    );
}