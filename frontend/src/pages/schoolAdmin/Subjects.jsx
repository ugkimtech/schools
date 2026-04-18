import { FaBookReader, FaCheck, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import TableCard from "../components/TableCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubjects, { createSubject } from "./hooks/useSubjects";
import "../components/assets/styles/CustomElements.css";
import Spiner from "../components/Spiner";

export default function Subjects(){
    const navigate = useNavigate();
    const subjects = useSubjects();
    const [spin, setSpin] = useState(false);
    const [toggleForm, setToggleForm] = useState(false);
    
    const formToggle = () => setToggleForm(!toggleForm);

    const subjectsTable =()=>{
        return subjects.map(subject=>(
            {...subject, subject_name:subject.subject_name, meta_data: subject.meta_data.papers.join(', ')}
        ))
    }

    const newField =()=>{
        const papersDiv = document.querySelector('.papers');
        const papersInput = document.createElement('input');
        papersInput.setAttribute('type', 'text');
        papersInput.setAttribute('name', 'code');
        papersInput.setAttribute('placeholder', 'Eg. P505/1 -or- 1');
        papersDiv.appendChild(papersInput)
    }

    const saveSubject =(e)=>{
        e.preventDefault();
        setSpin(true);
        const formEl = e.target;
        const subjectData = new FormData();
        const codesList=[];
        const inputs = formEl.querySelectorAll('input');
        inputs.forEach(input => {
            if(input.name === 'subject_name'){
                subjectData.append(input.name, input.value);
            }else if(input.name === 'code'){
                codesList.push(input.value)
            }
        });
        
        const metaData = {'papers': codesList}
        subjectData.append('meta_data', JSON.stringify(metaData));
        createSubject(subjectData);
        setSpin(false);
    }

    useEffect(()=>{
        navigate('#');
    }, [subjects]);

    return (
        <>
        {
            !toggleForm ?
            <button style={{
                color:'green',
                border:'var(--border)',
                background:'var(--bg)',
                borderRadius:'5px',
                margin:'5px'
            }} onClick={formToggle}><FaPlusCircle /> New Subject</button>:''
        }

        {
            toggleForm ?
            <div className="custom-form-div">
                <button className={`formToggle-btn`} onClick={formToggle}><FaTimesCircle /> Close</button>
                <h2>Add new Subject</h2>
                <form onSubmit={saveSubject} className="custom-form">
                    <label>Subject Name</label>
                    <input type="text" name="subject_name" placeholder="Eg. English" />
                    <div className="papers">
                        <p>Subject Papers (if any)</p>
                        <input type="text" name="code" placeholder="Eg. P505/1 -or- 1" />
                    </div>
                    <button onClick={newField} type="button"> Add Paper <FaPlusCircle /> </button>
                    <button type="submit">Save <FaCheck /> </button>
                </form>
                {spin ? <Spiner state={'start'} />:''}
            </div>:''
        }

        <TableCard
            header={{title:'Subjects Taught Here', icon:<FaBookReader />, manage:true}}
            columns={[
                {header:'Subject Name', accessor:'subject_name'}, 
                {header:'Subject Papers (if any)', accessor:'meta_data'}]}
            data={subjectsTable()?subjectsTable():['NA']}
        />
        </>
    )
}