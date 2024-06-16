import React from 'react'
import '../styles/components/NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <div className="app-title">
          <h3>Welcome to <br /><i>Kabarako Shop</i></h3>
        </div>
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