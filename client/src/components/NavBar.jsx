import React from 'react'
import '../styles/components/NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <h3>Welcome to Kabarako Shop</h3>    
        <div className="nav-links">
          <NavLink to={'/'}>Dashboard</NavLink>
          <NavLink to={'display-item'}>Coffee List</NavLink>
          <NavLink to={'add-item'}>Add Item</NavLink>

        </div>     
      </div>
    </>
  )
}

export default NavBar