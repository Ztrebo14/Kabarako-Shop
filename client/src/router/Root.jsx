import React from 'react'
import '../styles/Root.css'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Root = () => {
  return (
    <>
        <div>Root</div>
        <div className="root-container">
            <div className="div1">
                <NavBar />
            </div>
            <div className="div2">
                <Outlet />  
            </div>
        </div>
    </>
  )
}

export default Root