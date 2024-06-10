import React from 'react'
import { useAuth } from './Auth'
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({children}) {
    const Auth=useAuth();
    // const location=useLocation();
    if(Auth.isLoading) {
      return <></>
    }
    // if(!Auth.info.auth ) {
    //     return <Navigate to={"/login"} state={{path:location.pathname}}/>
    // }
  return (
     children
  )
}
