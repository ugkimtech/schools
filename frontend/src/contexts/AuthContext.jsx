import { createContext, useState, useEffect } from "react";
import "../util/settings.js";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [apiError, setApiError] = useState('');

    // check if user exists
    useEffect(()=>{
        const access = localStorage.getItem('access');
        if(access){
            const payload = JSON.parse(atob(access.split(".")[1]));
            setUser({...payload, access});
        }
    }, []);

    //check token expiration
    useEffect(()=>{
        const token = localStorage.getItem('access')
        if(token){
            try {
                const is_expired = JSON.parse(atob(token.split(".")[1])).exp*1000 < Date.now();
                if(is_expired) {
                    refreshToken();
                }
            }catch(e){
                console.log(e)
            }
        }
    },[]);

    //refresh token
    const refreshToken = async ()=> {
        localStorage.removeItem("access");
        const refresh = localStorage.getItem('refresh');
        if(refresh){
            try{
                const response = await fetch(`${BASE_URL}refresh/`, {
                    method: 'POST',
                    headers: {"Content-type":"application/json"},
                    body: {"refresh": JSON.stringify({refresh})}
                })
                if(response.ok){
                    const data = await response.json();
                    localStorage.setItem("access", data.access);
                    return data.access;
                }else {
                    localStorage.clear();
                    window.location.href = '/login';
                }
            }catch(e){
                console.log(e);
                return e;
            }
        }
    }

    // login context
    const login = async (username, password)=> {
        try{
            const response = await fetch(`${BASE_URL}token/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });

            if(response.status === 200){
                const data = await response.json();
                const access = data.access;
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', data.refresh);
                const payload = JSON.parse(atob(data.access.split(".")[1]));
                setUser({...payload, access});
                return 200;

            }else if(response.status === 401){
                setApiError('Invalid Credentials!');
                return 401;

            }else if(response.status === 500){
                setApiError('Server error!, please try again');
                return 500;
            }

        }catch(e){
            console.log(e)
            setApiError(`Un expected error has occured, please try again ${e}`);
            return 0;
        }
    }

    // logout context
    const logout = ()=> {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, 
                                    apiError, 
                                    setApiError, 
                                    login, 
                                    logout,
                                    refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
}