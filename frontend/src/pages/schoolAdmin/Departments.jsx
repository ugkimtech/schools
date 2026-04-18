import { useEffect, useState } from "react";
import useDepartments, {createDepartment} from "./hooks/useDepartments";
import { useNavigate } from "react-router-dom";
import TableCard from "../components/TableCard";
import Form from "../components/Form";
import { FaLayerGroup, FaPlusCircle } from "react-icons/fa";
import useStaff from "./hooks/useStaff";


export default function Departments(){
    const departments = useDepartments();
    const navigate = useNavigate();
    const staff = useStaff();
    const [toggleForm, setToggleForm] = useState(false);
    
    const formToggle = () => setToggleForm(!toggleForm);

    const getHead = ()=> {
        const heads=[];
        staff.map(head => (
            heads.push({value:head.id, option:head.first_name})
        ))
        return heads;
    }

    useEffect(()=>{
        navigate('#');
    },[departments, staff]);

    return(
        <>
            <button style={{
                color:'green',
                border:'var(--border)',
                background:'var(--bg)',
                borderRadius:'5px',
                margin:'5px'
            }} onClick={formToggle}><FaPlusCircle /> New Department</button>

            <TableCard
                header={{title:'Departments', icon:<FaLayerGroup />, manage:true}}
                columns={[{header:'Department Name', accessor:'dep_name'}, {header:'Department Head', accessor:'dep_head'}]}
                data={departments?departments:['NA']}
            />
            
            {
                toggleForm ?
                <Form form={{
                    title: 'Create A New Department', fields:[
                        {field:'input', label:'Department Name', type:'text', name:'dep_name', placeholder:'Enter name of department'},
                        {field:'dropdown', label:'Head of Department', name:'dep_head', options:getHead()}
                    ],
                    button:{text: 'Create'}
                    }} onSubmit={createDepartment}
                />:''
            }
        </>
    );
}