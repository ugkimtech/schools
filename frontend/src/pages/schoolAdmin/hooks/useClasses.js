import { useEffect, useState } from "react";
import APICall from "../../../api/api";
const api = new APICall();

export default function useClasses(){
    const [classes, setClasses] = useState([]);
    useEffect(()=>{
        api.get('classes/manage-classes/').then(setClasses);
    }, []);

    return classes;
}

export async function createClass(data){
    const response = await api.create('classes/manage-classes/', data);
    response === 201 ? alert('Success') : alert(response);
}