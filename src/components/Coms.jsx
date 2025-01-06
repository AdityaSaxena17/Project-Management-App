import React from 'react'
import { NavLink } from 'react-router-dom'

function Coms(props) {
    return (
        <div>
            <NavLink to={`/teamslist/${props.teamid}/announcements`}><img className='fixed bottom-14 w-10 h-10    right-5 z-20 rounded-lg' src="../src/assets/announcement-megaphone-svgrepo-com.svg"/></NavLink>
            <NavLink to={`/teamslist/${props.teamid}/reports`}><img className='fixed bottom-14 w-10 h-10   right-20 z-20 rounded-lg' src="../src/assets/reports-svgrepo-com.svg"/></NavLink>
        </div>
      )
}

export default Coms