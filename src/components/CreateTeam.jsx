import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateTeam() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.user.activeUser)
  console.log(user)
  const [teamname,setteamname]=useState("")
  const [teamleadername,setteamleadername]=useState(user)
  const [memberid1,setmemberid1]=useState(-1)
  const [memberid2,setmemberid2]=useState(-1)
  const [memberid3,setmemberid3]=useState(-1)
  const [memberid4,setmemberid4]=useState(-1)
  const [membername1,setmembername1]=useState("")
  const [membername2,setmembername2]=useState("")
  const [membername3,setmembername3]=useState("")
  const [membername4,setmembername4]=useState("")
  const [failureflag,setfailureflag]=useState("hidden")
  async function formhandler(event){
    event.preventDefault()
    const result=await axios.post("/api/createteam",{teamname:teamname,teamleadername:teamleadername,memberid1:memberid1,memberid2:memberid2,memberid3:memberid3,memberid4:memberid4,membername1:membername1,membername2:membername2,membername3:membername3,membername4:membername4})
    if(result.data.flag){
      navigate("/teamslist",{success:true})
    }
    else{
      setfailureflag("")
    }
  }

  return (
    <div className="flex flex-col h-screen">

  <main className="flex-grow flex justify-center items-center p-4">
    <form onSubmit={(e) => formhandler(e)} className="flex flex-col w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Team Registration</h2>

      <div className="flex flex-col mb-4">
        <label className="font-semibold mb-2" htmlFor="teamName">Team Name:</label>
        <input
          id="teamName"
          className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
          type="text"
          onChange={(e) => setteamname(e.target.value)}
          placeholder="Enter Team Name"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="font-semibold mb-2" htmlFor="teamLeader">Team Leader:</label>
        <input
          id="teamLeader"
          className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
          type="text"
          onChange={(e) => setteamleadername(e.target.value)}
          readOnly
          defaultValue={teamleadername}
          placeholder="Enter Team Leader's Name"
        />
      </div>

      {/* Member 1 Details */}
      <div className="flex flex-col mb-4">
            <p className="font-semibold text-lg mb-2">Member 1 Details</p>
            <label className="font-semibold mb-2" htmlFor="memberId1">Member ID</label>
            <input
              id="memberId1"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmemberid1(e.target.value)}
              placeholder="Enter Member Id 1"
            />
            <label className="font-semibold mb-2 mt-2" htmlFor="memberName1">Member Name</label>
            <input
              id="memberName1"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmembername1(e.target.value)}
              placeholder="Enter Member Name 1"
            />
          </div>

          {/* Member 2 Details */}
          <div className="flex flex-col mb-4">
            <p className="font-semibold text-lg mb-2">Member 2 Details</p>
            <label className="font-semibold mb-2" htmlFor="memberId2">Member ID</label>
            <input
              id="memberId2"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmemberid2(e.target.value)}
              placeholder="Enter Member Id 2"
            />
            <label className="font-semibold mb-2 mt-2" htmlFor="memberName2">Member Name</label>
            <input
              id="memberName2"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmembername2(e.target.value)}
              placeholder="Enter Member Name 2"
            />
          </div>

          {/* Member 3 Details */}
          <div className="flex flex-col mb-4">
            <p className="font-semibold text-lg mb-2">Member 3 Details</p>
            <label className="font-semibold mb-2" htmlFor="memberId3">Member ID</label>
            <input
              id="memberId3"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmemberid3(e.target.value)}
              placeholder="Enter Member Id 3"
            />
            <label className="font-semibold mb-2 mt-2" htmlFor="memberName3">Member Name</label>
            <input
              id="memberName3"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmembername3(e.target.value)}
              placeholder="Enter Member Name 3"
            />
          </div>

          {/* Member 4 Details */}
          <div className="flex flex-col mb-4">
            <p className="font-semibold text-lg mb-2">Member 4 Details</p>
            <label className="font-semibold mb-2" htmlFor="memberId4">Member ID</label>
            <input
              id="memberId4"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmemberid4(e.target.value)}
              placeholder="Enter Member Id 4"
            />
            <label className="font-semibold mb-2 mt-2" htmlFor="memberName4">Member Name</label>
            <input
              id="memberName4"
              className="p-3 rounded-lg border-2 border-gray-300 outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setmembername4(e.target.value)}
              placeholder="Enter Member Name 4"
            />
          </div>
      {/* Submit Button */}
      <div className="flex justify-center">
        <button className="p-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" type="submit">
          Submit
        </button>
      </div>

      {/* Failure Message */}
      <div className={`${failureflag} mt-4`}>
        <p className="text-red-500 font-semibold text-center">Failure</p>
      </div>
    </form>
  </main>

</div>

  
  )
}

export default CreateTeam