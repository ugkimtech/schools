import { useEffect } from "react";
import useDepartments, {createDepartment} from "./hooks/useDepartments";
import { useNavigate } from "react-router-dom";
import TableCard from "../components/TableCard";
import Form from "../components/Form";
import { FaLayerGroup } from "react-icons/fa";


export default function Departments(){
    const departments = useDepartments();
    const navigate = useNavigate();
    

    useEffect(()=>{
        navigate('#');
    },[departments]);

    return(
        <>
            <TableCard
                header={{title:'Departments', icon:<FaLayerGroup />, manage:true}}
                columns={[{header:'Department Name', accessor:'dep_name'}, {header:'Department Head', accessor:'dep_head'}]}
                data={departments?departments:['NA']}
            />
            <Form form={{
                title: 'Create A New Department', fields:[
                    {field:'input', label:'Department Name', type:'text', name:'dep_name', placeholder:'Enter name of department'},
                    {field:'dropdown', label:'Head of Department', name:'dep_head', options:[
                        // {value:'', option:'Select From Staff'}
                    ]}
                ],
                button:{text: 'Create'}
                }} onSubmit={createDepartment}
            />
        </>
    );
}