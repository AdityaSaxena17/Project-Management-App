import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [flaghid, setFlaghid] = useState("hidden");
  const navigate = useNavigate();
  const dispatcher=useDispatch()

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const result = await axios.post("/api/login", { username: user, password: pass });
      if (result.data.flag === false) {
        setFlaghid("");
      } else {
        dispatcher(login({userid:result.data.userid,username:user}))
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setFlaghid("");
    }
  }

  return (
    <div className='p-4 h-[80vh] w-full flex justify-center items-center'>
      {/* <form className='outline outline-gray-500 flex flex-col rounded-lg' onSubmit={(e)=>{handleLogin(e)}}>
        <input
          type='text'
          placeholder="username"
          required
          className="p-4 outline mx-4 mt-4 outline-gray-300 outline-1"
          onChange={(e) => setUser(e.target.value)}
        />
        <p className={`p-4 mx-4 mb-3 outline-red-500 bg-red-300 outline-dashed outline-1 ${flaghid}`}>
          INVALID USERNAME OR PASSWORD
        </p>
        <input
          type='password'
          placeholder="password"
          className='p-4 mx-4 mb-4 mt-5 outline outline-gray-300 outline-1'
          required
          onChange={(e) => setPass(e.target.value)}
        />
        <button type='submit' className='p-4 mx-4 my-4 bg-blue-600 rounded-md text-white'>
          Log in
        </button>
      </form> */}
      <SignIn signUpUrl='/signup' forceRedirectUrl="/"/>
    </div>
  );
}

export default Login;
