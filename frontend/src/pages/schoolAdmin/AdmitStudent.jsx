import { useEffect, useState } from "react";
import useStudents, { createStudent } from "./hooks/useStudents";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useClasses from "./hooks/useClasses";
import TableCard from "../components/TableCard";
import { FaPlusCircle, FaUserGraduate } from "react-icons/fa";

export default function AdmitStudent(){
    const students = useStudents();
    const navigate = useNavigate();
    const classes = useClasses();
    const [toggleForm, setToggleForm] = useState(false);
    const [streams, setStreams] = useState([]);

    const formToggle = () => setToggleForm(!toggleForm);


    useEffect(()=>{
        navigate('#');
        const str=[];
        classes.map(_class =>(
            _class.meta_data.streams.map((st)=>(
                str.includes(st.stream) || !st.stream ? '': str.push(st.stream)
            ))
        ))
        setStreams(str);
    },[students]);


    return (
        <>
        <button style={{
                            color:'green',
                            border:'var(--border)',
                            background:'var(--bg)',
                            borderRadius:'5px',
                            margin:'5px'
                        }} onClick={formToggle}><FaPlusCircle /> New Student</button>
        <TableCard
            header={{title:'Students', icon:<FaUserGraduate />, manage:true}}
            columns={[
                {header:'Photo', accessor:'photo'},
                {header:'First Name', accessor:'first_name'}, 
                {header:'Last Name', accessor:'last_name'},
                {header:'Other Name(s)', accessor:'other_name'},
                {header:'Student ID', accessor:'username'},
                {header:'Gender', accessor:'gender'},
                {header:'Class', accessor:'current_class'},
                {header:'Stream', accessor:'stream'},]}
            data={students?students:[]}
        />

        {
            toggleForm ? 
            <Form form={{
                title: 'Add a Student', fields:[
                    {field:'input', label:'First Name', type:'text', name:'first_name', placeholder:'e.g: John', required:true},
                    {field:'input', label:'Last Name', type:'text', name:'last_name', placeholder:'e.g: Kato', required:true},
                    {field:'input', label:'Other Name(s)', type:'text', name:'other_name', placeholder:'e.g: Kato', required:false},
                    {field:'input', label:'Admission Number', type:'text', name:'admission_number', placeholder:'e.g: Kato', required:false},
                    {field:'dropdown', label:'Class', name:'current_class', options:classes.map((_class)=>(
                        {value:_class.id, option:_class.class_name}
                    ))},
                    {field:'dropdown', label:'Stream (if any)', name:'stream', options:streams.map((stream)=>(
                        {value:stream, option:stream}
                    ))},
                    {field:'dropdown', label:'Gender', name:'gender', required:true, options:[
                        {value:'MALE', option:'Male'},
                        {value:'FEMALE', option:'Female'},
                        {value:'UNKNOWN', option:'Not Sure'}
                    ]},
                    {field:'input', label:'Guardian Name', type:'text', name:'guardian_name', placeholder:'e.g: Kato James'},
                    {field:'input', label:'Guardian Phone', type:'text', name:'guardian_phone', placeholder:'e.g: 0712345678'},
                    {field:'input', label:'Guardian Email', type:'email', name:'guardian_email', placeholder:'e.g: example@email.com'},
                    {field:'input', label:'Relationship', type:'text', name:'relationship', placeholder:'e.g: Parent'},
                    {field:'input', label:'Address', type:'text', name:'address', placeholder:'e.g: Kampala'},
                    {field:'input', label:'Allergies (if any)', type:'text', name:'allergies', placeholder:'Eg. allergy1, allergy2,...'},
                    {field:'input', label:'Medical Conditions', type:'text', name:'medical_conditions', placeholder:'e.g: Good'},
                    {field:'input', label:'Special Needs', type:'text', name:'special_needs', placeholder:'e.g: Sitting infront'},
                    {field:'dropdown', label:'Fee Category -comming-soon', name:'fee_category', options:[
                        {value:'', option:'Comming soon'}
                    ]},
                    {field:'input', label:'Payable Amount', type:'number', name:'payable_amount', placeholder:'e.g: 1000'},
                    {field:'dropdown', label:'Boarding Status', name:'boarding_status', options:[
                        {value:'BOARDING', option:'Bording'},
                        {value:'DAY', option:'Day'},
                        {value:'OTHERS', option:'Others'}
                    ]},
                    {field:'file', label:'Photo', type:'file', name:'photo', placeholder:'Upload'},
                ],
                button:{text: 'Save'}
                }} 
                onSubmit={createStudent}
            />:''
        }
        </>
    );
}