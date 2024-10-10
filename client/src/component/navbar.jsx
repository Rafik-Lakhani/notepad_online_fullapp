import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-zinc-900 text-white p-4'>
      <div className='container mx-auto flex justify-center items-center'>
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold mx-4' : 'text-gray-300 hover:text-white mx-4'
          }
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/file" 
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-bold mx-4' : 'text-gray-300 hover:text-white mx-4'
          }
        >
          Files
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar