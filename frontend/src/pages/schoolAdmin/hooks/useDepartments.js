import { useEffect, useState } from "react";
import APICall from "../../../api/api.js";

const api = new APICall();

export default function useDepartments(){
    const [departments, setDepartments] = useState([]);

    useEffect(()=>{
        api.get('departments/manage-departments/').then(setDepartments);
    }, []);

    return departments;
}

export const createDepartment = async (data) => {
    const response = await api.create('departments/manage-departments/', data);
    response != 201 ? alert(response):alert('Success')
}