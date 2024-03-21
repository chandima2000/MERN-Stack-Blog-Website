import React from 'react'
import {useSelector} from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';

export default function PrivateRoute() {
    
    const {currentUser} = useSelector((state) => state.user)

  return (

    currentUser ? <Outlet/> : <Navigate to = 'sign-in'/>
    //If currentUser is exist, then render the child element (<Dashboard/>)
    //otherwise redirect to the signIn page.
    //The <Outlet/> is used to render the Child components
  )
}
