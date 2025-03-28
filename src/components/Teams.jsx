import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

function Teams() {
    const location=useLocation()
    const userid = useSelector((state) => state.user.userid);
    const user=useSelector((state)=>state.user.activeUser)
    const [teamList, setTeamList] = useState([]);
    var success=location.state?.success || false
    const [successflag,setsuccessflag]=useState("hidden")
    console.log(userid)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.post("/api/teamslist", { userid: userid,username:user });
                setTeamList(response.data); 
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, [userid]);
    
    useEffect(()=>{
        const successhandler=()=>{
            setTimeout(()=>{
                setsuccessflag("hidden")
            },3000)
        }
        if(success){
            setsuccessflag("")
            successhandler()
            success=false
        }
    },[success])


    return (
        <div className='h-[80vh]'>
            <ul className='flex flex-wrap'>
                {teamList.map((team) => (
                    // <NavLink to={`/teamslist/${team.teamid}`}><li className="outline p-4 ml-10 my-5" key={team.teamid}>{team.teamname}</li></NavLink>
                    
                        
                        <div class="max-w-sm p-6 bg-white border p-4 ml-10 my-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={team.teamid}>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{team.teamname}</h5>
                            {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
                            <NavLink to={`/teamslist/${team.teamid}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View Team ➯
                                {/* <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2 flex " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg> */}
                            </NavLink>
                        </div>
                
                
                
                ))}
            </ul>
            <div className={`${successflag}`}>SUCCESS</div>
        </div>
    );
}

export default Teams;
