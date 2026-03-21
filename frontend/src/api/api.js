import { BASE_URL } from "../util/settings";

class APICall {
    constructor() {
    }

    async create (endPoint, data) {
        try{
            const response = await fetch(`${BASE_URL + endPoint}`, { 
                method: 'POST',
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('access')}`
                },
                body: data
            });

            const status = response.status;

            switch(status){
                case 201:{
                    return 201;
                }
                case 400:{
                    const res = await response.json();
                    if(res.email){
                        return `${res.email}`;
                    }else if(res.username){
                        return `${res.username}`;;
                    }else {
                        return `${response.status +':'+ res[0]}`;
                    }
                }
                case 500:{
                    const res = response.json();
                    return `${response.status +':'+ res[0]}`;
                }
            }
        }catch(e){
            return 'Un expected error!, please try again';
        }
    }

    async get(endPoint){
        try{
            const response = await fetch(`${BASE_URL + endPoint}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('access')}`
                }
            });

            if(response.ok){
                const data = await response.json();
                return data;
            }else if(response.status===404){
                console.log(`not found @ ${endPoint.split('/')[1]}`);
                return null;
            }
        }catch(e){
            console.log(e)
            return null;
        }
    }
}

export default APICall;