import { useNavigate } from "react-router-dom";
import useClasses, { createClass } from "./hooks/useClasses";
import { useEffect, useState } from "react";
import TableCard from "../components/TableCard";
import { FaArrowLeft, FaBookOpen, FaCheck, FaPlusCircle } from "react-icons/fa";
import "../components/assets/styles/CustomElements.css";
import useStaff from "./hooks/useStaff";
import Spiner from "../components/Spiner";

export default function Classes() {

    const classes = useClasses();
    const navigate = useNavigate();
    const staff = useStaff();
    const [spin, setSpin] = useState(false);

    const getStaff = ()=> {
        const teachers=[];
        staff.map(head => (
            teachers.push({value:head.id, option:head.first_name})
        ))
        return teachers;
    }

    const classesTable =()=>{
        return classes.map(classData=>(
            {...classData, class_name:classData.class_name,
                class_teacher:classData.class_teacher,
                streams:classData.meta_data.streams.map(streamData=>`${streamData.stream +' => '+streamData.stream_class_teacher}. `)}
        ))
    }

    const newField =()=>{
            const streamsDiv = document.querySelector('.streams');
            const newStream = document.createElement('div');
            newStream.setAttribute('class', 'more-streams');

            const nameLabel = document.createElement('label');
            nameLabel.innerText = 'Stream Name';
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('name', 'stream');
            nameInput.setAttribute('placeholder', 'Eg. A');

            const block = document.createElement('label');
            block.innerText = 'Block/Room No.';
            const room = document.createElement('input');
            room.setAttribute('type', 'text');
            room.setAttribute('name', 'room');
            room.setAttribute('placeholder', 'Eg. 201');

            const classTeacher = document.createElement('label');
            classTeacher.innerText = 'Class Teacher';
            const select = document.createElement('select');
            select.setAttribute('name', 'stream_class_teacher');
            select.innerHTML = `
                                <option value=''> -select- </option>
                                ${getStaff().map(teacher=>(
                                `<option value=${teacher.option}>${teacher.option}</option>`
                            ))}`;

            newStream.appendChild(nameLabel);
            newStream.appendChild(nameInput);
            newStream.appendChild(block);
            newStream.appendChild(room);
            newStream.appendChild(classTeacher);
            newStream.appendChild(select);
            streamsDiv.appendChild(newStream);
        }
    
        const saveClass =(e)=>{
            e.preventDefault();
            setSpin(true);
            const formEl = e.target;
            const classData = new FormData();
            let streamObj = {}
            const streamsList=[];
            const fields = formEl.querySelectorAll('input, select');
            fields.forEach(field => {
                if(field.name === 'class_name' && field.value != ""){
                    classData.append(field.name, field.value);
                }else if(field.name === 'class_teacher' && field.value != ""){
                    classData.append(field.name, parseInt(field.value));
                }else if(field.name === 'stream' && field.value != ""){
                    streamObj.stream = field.value;
                }else if(field.name === 'room' && field.value != ""){
                    streamObj.room = field.value;
                }else if(field.name === 'stream_class_teacher' && field.value != ""){
                    streamObj.stream_class_teacher = field.value;
                    streamsList.push({...streamObj});
                    streamObj={};
                }
            });
            
            const metaData = {streams: streamsList}
            classData.append('meta_data', JSON.stringify(metaData));
            
            for(let i of classData.entries()){
                console.log(i[0], i[1])
            }

            createClass(classData);
            setSpin(false);
        }

    useEffect(()=>{
        navigate('#');
    },[classes]);

    return (
        <>
        <TableCard
            header={{title:'Classes', icon:<FaBookOpen />, manage:true}}
            columns={[
                {header:'Class Name', accessor:'class_name'}, 
                {header:'Class Teacher', accessor:'class_teacher'},
                {header:'Streams', accessor:'streams'}]}
            data={classesTable()?classesTable():['NA']}
        />
        
        <div className="custom-form-div">
            <h2>Add new Class</h2>
            <form onSubmit={saveClass} className="custom-form">
                <label>Class Name</label>
                <input type="text" name="class_name" placeholder="Eg. P.1 -or- S.1" />
                    <label>Class Teacher</label>
                    <select name="class_teacher">
                        <option value=''>-select-</option>
                        {
                            getStaff().map((teacher, id)=>(
                                <option key={id} value={teacher.value}>{teacher.option}</option>
                            ))
                        }
                    </select>
                <div className="streams">
                    <p>Streams (if any)</p>
                    <label>Stream Name</label>
                    <input type="text" name="stream" placeholder="Eg. A" />
                    <label>Block/Room No.</label>
                    <input type="text" name="room" placeholder="Eg. 201" />
                    <label>Class Teacher</label>
                    <select name="stream_class_teacher">
                        <option value=''>-select-</option>
                        {
                            getStaff().map((teacher, index)=>(
                                <option key={index} value={teacher.value}>{teacher.option}</option>
                            ))
                        }
                    </select>
                </div>
                <button onClick={newField} type="button"> Add Stream <FaPlusCircle /> </button>
                <button type="submit">Save <FaCheck /> </button>
            </form>
            {spin ? <Spiner state={'start'} />:''}
        </div>
        </>
    );
}