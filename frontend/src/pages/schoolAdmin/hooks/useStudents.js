import { useEffect, useState } from "react";
import APICall from "../../../api/api";
const api = new APICall();

export default function useStudents(){
    const [students, setStudents] = useState([]);
    useEffect(()=>{
        api.get('students/student/').then(setStudents);
    }, []);

    return students;
}

export async function createStudent(data){
    const response = await api.create('students/new-student/', data);
    response === 201 ? alert('Success') : alert(response);
    window.location.reload(true);
}