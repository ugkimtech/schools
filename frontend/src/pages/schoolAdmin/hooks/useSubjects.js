import { useEffect, useState } from "react";
import APICall from "../../../api/api";
const api = new APICall();

export default function useSubjects(){
    const [subjects, setSubjects] = useState([]);
    useEffect(()=>{
        api.get('academics/subjects/').then(setSubjects);
    }, []);

    return subjects;
}

export async function createSubject(data){
    const response = await api.create('academics/subjects/');
    response === 201 ? alert('Success') : alert(response);
}