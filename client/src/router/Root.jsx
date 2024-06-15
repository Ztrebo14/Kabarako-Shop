import React from 'react'
import '../styles/Root.css'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Root = () => {
  return (
    <>
        {/* <div>Root</div> indicator of an Root element*/} 
        <div className="rootRoute-container">
          <div className="grid-contianer">
            <div className="navbar">
                <NavBar />
            </div>
            <div className="outlet">
                <Outlet />  
            </div>
          </div>
        </div>
    </>
  )
}

export default Root