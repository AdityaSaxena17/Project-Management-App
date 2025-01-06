import { UserButton } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'



function Header() {
    const user=useSelector((state)=>state.user.activeUser)
    const [teamflag,setteamflag]=useState("hidden")
    const [signflag,setsignflag]=useState("")
    var flag=true
    if(user==="Guest"){
        flag=false
    }
    useEffect(() => {
        if (user !== "Guest") {
            setsignflag("hidden");
            setteamflag("");
        }
    }, [user]);

  return (
    <div className='flex justify-between w-full h-16 bg-yellow-400'>
        <NavLink to="/"><img src="../../src/assets/group-team-svgrepo-com.svg" className="h-10 ml-3 my-2"/></NavLink>
        <div className='flex gap-10'>
            <NavLink className={`text-blue-600 my-4 ${teamflag} hover:text-blue-900 hover:underline`} to="/teams">Teams</NavLink>
            <NavLink className="text-blue-600 my-4 hover:text-blue-900 hover:underline" to="/AboutMe">About me</NavLink>
            <NavLink className="text-blue-600 my-4 hover:text-blue-900 hover:underline" to="/ContactMe">Contact me</NavLink>
        </div>
        <div className='flex gap-5 mr-4'>
            <div className={`flex ${teamflag}`}><UserButton afterSwitchSessionUrl='/login'/></div>
            {/* <NavLink className={`flex ${teamflag}`}> <img className='h-8 my-3' src="../../src/assets/user-svgrepo-com.svg"/> <p className={`font-bold text-blue-600 text-center my-4 hover:text-blue-900 hover:underline`}> {user}</p></NavLink> */}
            <NavLink className={`text-blue-600 my-1 ${signflag} hover:text-blue-900 hover:underline`} to="/login"><img className='h-8' src="../../src/assets/sign-in-svgrepo-com.svg"/> Sign in</NavLink>
            <NavLink className={`text-blue-600 my-1 ${signflag} hover:text-blue-900 hover:underline`} to="/signup"><img className='h-8' src="../../src/assets/register-svgrepo-com.svg"/> Register</NavLink>
        </div>
    </div>
  )
}

export default Header