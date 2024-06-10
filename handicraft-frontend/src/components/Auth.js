import { createContext, useContext, useState,useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";


export const AuthContext=createContext(null);

export const ContextProvider=({children})=> {
    const [jwt,setJwt]=useState(null);
    const [isLoading,setIsLoading]=useState(true)
    const [info,setInfo]=useState({auth:false,role:""});
    const [user ,setUser]=useState();
    const [filter,setFilter]=useState("")

    const login=(jwt)=> {
        setJwt(jwt);
        setInfo({auth:true,role:jwtDecode(jwt).role})
        // loadUser(jwtDecode(jwt).userId)
    }

   
    const logout=()=> {
        setJwt(null)
        setInfo({auth:false,role:""})
        // setIsLoading(false)
    }

    const loadUser=async(id)=> {
        try {
            const result = await axios.get(`http://localhost:8080/user/${id}`, {
              headers: {
                // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                Authorization: `Bearer ${jwt}`,
              }
            });
            setUser(result.data);
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("jwt");
        if (storedUser) {
            setJwt(JSON.parse(storedUser));
          setInfo({auth:true,role:jwtDecode(storedUser).role})
          loadUser(jwtDecode(storedUser).userId)
        }
        setIsLoading(false)
      }, [info.auth]);

    return (<AuthContext.Provider value={{jwt,info,user,login,logout,isLoading,setIsLoading,filter,setFilter}}>
            {children}
             </AuthContext.Provider>)
}
export const useAuth=()=> {
    return useContext(AuthContext);
}