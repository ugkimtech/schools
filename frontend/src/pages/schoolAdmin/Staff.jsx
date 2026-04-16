import { FaPlusCircle, FaUsers } from "react-icons/fa";
import Form from "../components/Form";
import TableCard from "../components/TableCard";
import useStaff, {createStaff} from "./hooks/useStaff";
import useGroups from "./hooks/useGroups";
import useDepartments from "./hooks/useDepartments";
import useSubjects from "./hooks/useSubjects";
import useClasses from "./hooks/useClasses";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Staff(){
    const navigate = useNavigate();
    const staff = useStaff();
    const groups = useGroups();
    const departments = useDepartments();
    const subjects = useSubjects();
    const classes = useClasses();
    const [toggleForm, setToggleForm] = useState(false);

    const staffMembers =()=>{
        const myStaff = staff.map((member)=>(
            {...member, departments:member.departments.map(d=>`${d.dep_name}. `)}
        ))
        return myStaff;
    }

    useEffect(()=>{
        navigate('#');
    },[staff]);

    const formToggle = () => setToggleForm(!toggleForm);

    return (
        <>
            <button style={{
                    color:'green',
                    border:'var(--border)',
                    background:'var(--bg)',
                    borderRadius:'5px',
                    margin:'5px'
                }} onClick={formToggle}><FaPlusCircle /> New Member</button>

            <TableCard
                header={{title:'Staff Members', icon:<FaUsers />, manage:true}}
                columns={[
                    {header:'Photo', accessor:'photo'},
                    {header:'First Name', accessor:'first_name'}, 
                    {header:'Last Name', accessor:'last_name'},
                    {header:'Other Name(s)', accessor:'other_name'},
                    {header:'Staff ID', accessor:'username'},
                    {header:'Gender', accessor:'gender'},
                    {header:'Phone', accessor:'phone'},
                    {header:'Department(s)', accessor:'departments'},]}
                data={staffMembers()?staffMembers():[]}
            />

            <button style={{
                    color:'green',
                    border:'var(--border)',
                    background:'var(--bg)',
                    borderRadius:'5px',
                    margin:'5px'
                }} onClick={formToggle}><FaPlusCircle /> New Member</button>
            
            {
                toggleForm ? 
                <Form form={{
                    title: 'Add New Staff Member', fields:[
                        {field:'input', label:'First Name', type:'text', name:'user.first_name', placeholder:'e.g: Charles', required:true},
                        {field:'input', label:'Last Name', type:'text', name:'user.last_name', placeholder:'e.g: Kimera', required:true},
                        {field:'input', label:'Other Name(s)', type:'text', name:'other_name', placeholder:'3rd Name'},
                        {field:'input', label:'Email', type:'email', name:'user.email', placeholder:'e.g: exampl@email.com'},
                        {field:'input', label:'Phone', type:'text', name:'phone', placeholder:'e.g: 0712345678'},
                        {field:'input', label:'Alternative Phone', type:'text', name:'alt_phone', placeholder:'e.g: 0712345678'},
                        {field:'input', label:'Date Of Birth', type:'date', name:'date_of_birth', placeholder:'Select'},
                        {field:'dropdown', label:'Access Permissions', name:'groups', options:groups.map((group, index)=>(
                            {value:group.id, option:group.name}
                        ))},
                        {field:'input', label:'Password', type:'password', name:'user.password', placeholder:'0000', required:true},
                        {field:'dropdown', label:'Gender', name:'gender', options:[
                            {value:'MALE', option:'Male'},
                            {value:'FEMALE', option:'Female'},
                            {value:'UNKNOWN', option:'Not Sure'}
                        ]},
                        {field:'file', label:'Photo', type:'file', name:'photo', placeholder:'Upload'},
                        {field:'input', label:'NIN', type:'text', name:'NIN', placeholder:'National ID Number'},
                        {field:'input', label:'Address', type:'text', name:'address', placeholder:'Current Physical Address'},
                        {field:'input', label:'District Of Origin', type:'text', name:'district', placeholder:'District of Origin'},
                        {field:'input', label:'Emergence Contact Person', type:'text', name:'emergence_contact_name', placeholder:'His/Her Name'},
                        {field:'input', label:'Emergence Contact Phone', type:'text', name:'emergence_phone', placeholder:'e.g: 0712345678'},


                        {field:'checkbox', label:'Department', name:'departments', options:departments.map((department)=>(
                            {name:'departments', value:department.id, text:department.dep_name}
                        ))},


                        {field:'dropdown', label:'Employment Type', name:'employment_type', options:[
                            {value:'PART_TIME', option:'Part Time'},
                            {value:'FULL_TIME', option:'Full Time'},
                            {value:'CONTRACT', option:'Contract'}
                        ]},
                        {field:'input', label:'Contract Start', type:'date', name:'contract_start'},
                        {field:'input', label:'Contract End', type:'date', name:'contract_end'},
                        {field:'input', label:'Qualification', type:'text', name:'qualification', placeholder:'e.g Bachelors Degree'},
                        {field:'input', label:'Experience (yrs)', type:'number', name:'experience', placeholder:'e.g 2 (in years)'},

                        {field:'checkbox', label:'Subjects Taught (If Teacher)', name:'subjects_taught', options:subjects.map((subject)=>(
                            {name:'subjects_taught', value:subject.id, text:subject.subject_name}
                        ))},

                        // {field:'dropdown', label:'Classes Taught (If Teacher)', name:'classes_taught', options:classes.map((item)=>(
                        //     {value:item.id, option:item.class_name}
                        // ))},
                        {field:'checkbox', label:'Classes Taught (If Teacher)', name:'classes_taught', options:classes.map((item)=>(
                            {name:'classes_taught', value:item.id, text:item.class_name}
                        ))},

                        {field:'input', label:'Registration Number', type:'text', name:'reg_number', placeholder:'if any'},
                        {field:'input', label:'License Number', type:'text', name:'license_number', placeholder:'if any'},
                        {field:'input', label:'Salary', type:'number', name:'salary', placeholder:'e.g: 1000'},
                        {field:'input', label:'Bank Name', type:'text', name:'bank_name', placeholder:'e.g: Centenary Bank'},
                        {field:'input', label:'Account Number', type:'text', name:'account_number', placeholder:'e.g: 0123456...'},
                        {field:'input', label:'TIN Number', type:'text', name:'tin_number', placeholder:'e.g: 0123456...'},
                        {field:'input', label:'NSSF Number', type:'text', name:'nssf_number', placeholder:'e.g: 0123456...'},
                        {field:'file', label:'Qualification Certificate', type:'file', name:'certificate', placeholder:'Upload'},
                        {field:'file', label:'Contract Document', type:'file', name:'contract_document', placeholder:'Upload'},
                    ],
                    button:{text: 'Create'}
                    }} 
                    onSubmit={createStaff}
                /> : ''
            }
        </>
    );
}