import { useEffect, useState } from "react";
import APICall from "../../../api/api";
const api = new APICall();

export default function useStaff(){
    const [staff, setStaff] = useState([]);
    useEffect(()=>{
        api.get('staff/manage-staff/').then(setStaff);
    }, []);

    return staff;
}

export async function createStaff(data){
    console.log(data)
    const response = await api.create('staff/new-staff/', data);

    for(let pair of data.entries()){
        console.log(pair[0],':', pair[1]);
    }
    response === 201 ? alert('Success') : alert(response);
}