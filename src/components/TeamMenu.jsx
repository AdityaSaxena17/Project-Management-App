import React from 'react'
import { NavLink } from 'react-router-dom'

function TeamMenu() {
  return (
    <div className='h-[80vh] flex items-center justify-center'>
        <div className='flex gap-48 '>
            <NavLink to="/teamslist" className="hover:outline p-6 hover:outline-4" ><img className='h-40 hover:w-60 hover:h-60' src='../../src/assets/team-svgrepo-com.svg'/><p className='text-center p-4 font-bold'>Teams list</p></NavLink>
            <NavLink to="/createteam" className="hover:outline p-6 hover:outline-4" ><img className='h-40 hover:w-60 hover:h-60' src='../../src/assets/create-group-svgrepo-com.svg'/><p className='text-center p-4 font-bold'>Create team</p></NavLink>
        </div>
    </div>
  )
}

export default TeamMenu