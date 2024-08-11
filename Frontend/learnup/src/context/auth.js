import { useState,useEffect,useContext,createContext } from "react";
import axios from "axios";
//use it for global mean that after admin and user we manage some options instead context we also use redux
const AuthContext = createContext()
const AuthProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    });
    //default axios
    axios.defaults.headers.common['Authorization']=auth?.token
    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if (data)
        {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            });
        }
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
//below for custom hook
const useAuth = ()=>useContext(AuthContext)
export {useAuth,AuthProvider}
