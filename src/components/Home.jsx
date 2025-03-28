import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth';

function Home() {
  const dispatcher=useDispatch()
  // const location=useLocation()
  // const user=location.state?.user || "Guest"
  const { isSignedIn, user } = useUser();
  var activeuser=useSelector((state)=>state.user.activeUser)
  var userid=useSelector((state)=>state.user.userid)
  var [guestflag,setguestflag] = useState(true);
  
  useEffect(()=>{
    if (isSignedIn) {
      dispatcher(login({userid:user.id,username:user.username}))
      activeuser=user.username
      userid=user.id
    }
    if(userid!=0){
      setguestflag(false);
    }
    
  },[isSignedIn,user])

  return (
    // <div className='h-[80vh]'>Hello {activeuser},{userid}</div>
    <section className=" bg-gray-900 h-full">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
        Project Management Application
      </h1>
      <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Empowering teams to collaborate, achieve, and grow together.
      </p>
      {!guestflag || <Link to="/Login"
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-primary-900 dark:focus:ring-primary-900"
      >
        Get started
        {/* <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg> */}
      </Link> }
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center  border  rounded-lg focus:ring-4  text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
      >
        Learn more
      </a>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="src\assets\human-resource.png"
        alt="mockup"
      />
    </div>
  </div>
</section>

  )
}

export default Home