import { useEffect, useState } from "react";
import APICall from "../../../api/api";
const api = new APICall();

export default function useGroups(){
    const [groups, setGroups] = useState([]);
    useEffect(()=>{
        api.get('user/groups').then(setGroups);
    }, [])

    return groups;
}