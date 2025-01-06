import { SignUp } from '@clerk/clerk-react'
import React from 'react'

function Register() {
  return (
    <div className='p-4 h-[80vh] w-full flex justify-center items-center'>
        {/* <form className='outline outline-gray-500  flex flex-col rounded-lg'>
            <input type='text' placeholder="Enter Username" className="p-4 outline mx-4 my-4 outline-gray-300 outline-1"/>
            <input type='password' placeholder="Enter Password" className='p-4 mx-4 my-4 outline outline-gray-300 outline-1 '/>
            <input type='password' placeholder="Confirm Password" className='p-4 mx-4 my-4 outline outline-gray-300 outline-1 '/>
            <button type='submit' className='p-4 mx-4 my-4  bg-blue-600 rounded-md text-white'>Log in</button>
        </form> */}
      <SignUp/>
    </div>
  )
}

export default Register