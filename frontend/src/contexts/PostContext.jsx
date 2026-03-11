import { createContext, useState } from "react";
import "../util/settings.js";

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [postError, setPostError] = useState('');


    const doPost = async (endPoint, data)=> {
        try{
            const response = await fetch(`${BASE_URL + endPoint}`, { 
                method: 'POST',
                body: data
            });
            if(response.status === 201 | response.status === 200){
                const res = await response.json();
                return response.status;
            }else if(response.status === 400){
                const res = await response.json();
                if(res.email){
                    setPostError(res.email);
                }else if(res.username){
                    setPostError(res.username);
                }else {
                    setPostError(`${response.status +':'+ res[0]}`);
                }
                return response.status;
            }else if(response.status === 500){
                const res = response.json();
                setPostError('Server error!, please try again');
                return response.status;
            }else{
                const res = await response.json();
                setPostError(`${response.status +':'+ res[0]}`);
                return response.status;
            }
        }catch(e){
            setPostError('Un expected error!, please try again');
            return 0;
        }
    }

    return (
        <PostContext.Provider value={{ doPost, postError, setPostError }}>
            {children}
        </PostContext.Provider>
    )
}