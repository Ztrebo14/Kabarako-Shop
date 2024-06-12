import React from 'react'
import '../styles/components/NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
        <div className="navbar-wrapper">
            <NavLink to={'/'}>Dashboard</NavLink>
            <NavLink to={'add-item'}>Add Item</NavLink>
            <NavLink>Home</NavLink>
            <NavLink>Home</NavLink>
            <NavLink>Home</NavLink>
        </div>
    </>
  )
}

export default NavBar