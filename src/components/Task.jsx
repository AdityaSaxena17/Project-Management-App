import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./styledtable.css";
import { useSelector } from 'react-redux';
import Coms from './Coms';

function Task() {
  const params = useParams();
  const [teamLeader, setTeamLeader] = useState('');
  const [members, setMembers] = useState([]);
  const [duedate, setduedate] = useState("");
  const [memberid, setmemberid] = useState("");
  const [taskdesc, settaskdesc] = useState("");
  const [leaderFlag, setleaderFlag] = useState("hidden");
  const [memberflag, setmemberflag] = useState("hidden");
  const [successflag, setsuccessflag] = useState("hidden");
  const [failureflag, setfailureflag] = useState("hidden");
  const [late,setlate]=useState([])
  const [completed,setcompleted]=useState([])
  const [pending,setpending]=useState([])
  const user = useSelector((state) => state.user.activeUser);
  const userid=useSelector((state)=>state.user.userid)
  const [usertasks,setusertasks]=useState([])
  const [updatedflag,setupdatedflag]=useState(true)
  const [tuid,settuid]=useState(-1);
  let updatedtasks
  const showTasks=async (tuidf)=>{ 
    try{

      const result=await axios.post("/api/gettasks",{teamid:params.teamid,userid:tuidf})
      console.log("showtasks=",result.data)
      setusertasks(result.data);
    }
    catch(error){
      console.log(error)
    }
  }

  const doneTask=async (bid)=>{
    try{
      const result=await axios.patch("/api/donetask",{taskid:bid})
      if(result.data.flag){
        let id=0
        let count=0
        for(let i in members){
          console.log("index:",i)
          if(tuid==members[i].id){
            id=parseInt(i)
            count=parseInt(members[i].tasksCompleted)
            break
          }
        }
        id+=1
        count+=1
        // var a=s.slice(0,8)
        // var b=(8,9)
        // console.log("idbefore",id)
        // id*=10
        // id/=10
        // console.log("id:",id)
        var s=`tasksby${id}`
        await axios.patch("/api/updatecount",{tasksby:s,count:count,teamid:params.teamid})
        setupdatedflag((e)=>!e)
        updatedtasks=usertasks.filter((ele)=>(
          bid!=ele.taskid
        ))
        
        setusertasks(updatedtasks)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const lateHandler=async()=>{
    try{
      const result=await axios.post("/api/late",{teamid:params.teamid})
      setlate(result.data)
    }
    catch(error){
      console.log(error)
    }
  }
  
  const completedHandler=async()=>{
    try{
      const result=await axios.post("/api/completed",{teamid:params.teamid})
      setcompleted(result.data)
    }
      catch(error){
      console.log(error)
    }
  }

  const pendingHandler=async()=>{
    try{ 
      const result=await axios.post("/api/pending",{teamid:params.teamid})
      setpending(result.data)
      console.log(result.data)
    }
      catch(error){
        console.log(error)
    }

  }

  const fetchTeam = async () => {
    try {
      const result = await axios.post('/api/teamslist/get', { teamid: params.teamid });
      setTeamLeader(result.data.teamleader);
      console.log("HELLO:",result.data)
      setMembers([
        {
          id: result.data.memberid1,
          name: result.data.membername1,
          tasksCompleted: result.data.tasksby1,
        },
        {
          id: result.data.memberid2,
          name: result.data.membername2,
          tasksCompleted: result.data.tasksby2,
        },
        {
          id: result.data.memberid3,
          name: result.data.membername3,
          tasksCompleted: result.data.tasksby3,
        },
        {
          id: result.data.memberid4,
          name: result.data.membername4,
          tasksCompleted: result.data.tasksby4,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  async function assignHandler() {
    try {
      const result = await axios.post("/api/assigntask", { taskdesc, memberid, duedate, teamid: params.teamid });
      if (result.data.flag) {
        setsuccessflag("");
        settaskdesc("");
        setduedate("");
        setmemberid("");
        setTimeout(() => {
          setsuccessflag("hidden");
        }, 3000);
      } else {
        setfailureflag("");
        setTimeout(() => {
          setfailureflag("hidden");
        }, 3000);
      }
    } catch (error) {
      setfailureflag("");
      setTimeout(() => {
        setfailureflag("hidden");
      }, 3000);
    }
  }

  useEffect(() => {
    let tuidf;
    fetchTeam();
    if (user == teamLeader) {
      setleaderFlag("");
      setmemberflag("hidden")
      console.log("LEADER")
    } else {
      setmemberflag("");
      setleaderFlag("hidden")
      console.log("MEMBER")
      tuidf=tuidhandler();
    }
    lateHandler()
    pendingHandler()
    completedHandler()
  }, [params.teamid, user, teamLeader,successflag,updatedflag,userid]);

  useEffect(()=>{
    showTasks(tuid);
  },[tuid])


  async function tuidhandler() {
    try{
      const result=await axios.post("/api/gettuid",{teamid:params.teamid});
      console.log(result.data,"userclerkid=",userid);
      if(result.data.clerkid1==userid){
        settuid(1);
        return 1
      }
      else if(result.data.clerkid2==userid){
        settuid(2);
        return 2
      }
      else if(result.data.clerkid3==userid){
        settuid(3);
        return 3
      }
      else if(result.data.clerkid4==userid){
        settuid(4);
        return 4
      }
      console.log("tuid=",tuid);
    }
    catch(error){
      console.log(error);
    }
  }


  console.log(usertasks)

  return (
    <div className='h-[90vh] w-full flex'>
      <div className='w-1/4 h-[80vh] flex justify-center'>
        <div className='ml-5 w-full'>
          <p className=' text-2xl font-extrabold mt-5'>Team Leader: {teamLeader}</p>
          <table className='styled-table members-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>No of Tasks Completed</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.tasksCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${leaderFlag} flex flex-col w-4/5`}>
          <p className='font-bold mb-2 text-2xl text-center'>Assign a task</p>
          <input
            type='text'
            onChange={(e) => { settaskdesc(e.target.value); }}
            value={taskdesc}
            placeholder='Task description'
            className='mb-2 p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Member ID'
            onChange={(e) => { setmemberid(e.target.value); }}
            value={memberid}
            className='mb-2 p-2 border rounded'
          />
          <div className='flex border rounded'>
          <p className='mt-2 pl-2'>Due date:</p>
          <input
            type='date'
            onChange={(e) => { setduedate(e.target.value); }}
            value={duedate}
            className='mb-2 p-2'
          />
          </div>
          <button
            type='button'
            className='bg-blue-500 text-white p-2 rounded'
            onClick={assignHandler}
          >
            Assign
          </button>
          <p className={`${successflag}  outline-green-900 p-2 outline bg-green-600 text-white mt-3`}>Task assigned successfully!</p>
          <p className={`${failureflag} outline-red-900 p-2 outline bg-red-600 text-white mt-3`}>Failed to assign task!</p>
        </div>
        </div>
      </div>
      <div className='w-full h-[80vh] flex flex-col gap-14 items-center mt-10'>
        <div className={`${memberflag} flex`}>
              <div>
              <p className='text-center font-bold text-lg'>Pending tasks</p>
              <div className='scrollable-table'>
              <table className='styled-table members-table'>
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task Description</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    usertasks.map((task,index)=>(
                      <tr key={index}>
                      <td>{task.taskid}</td>
                      <td>{task.taskdesc}</td>
                      <td>{task.duedate}</td>
                      <button className="px-5 h-14 bg-green-700 text-white" onClick={()=>{doneTask(task.taskid)}}>Done</button>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              </div>
              </div>
        </div>
          {/*  */}
        <div className={`${leaderFlag} w-full flex justify-around mt-9`}>
            <div>
              <div>
                <p className='text-center font-bold text-lg'>Completed</p>
                <div className='scrollable-table'>
                <table className='styled-table completed-tasks'>
                <thead>
                    <tr>
                      <th>taskid</th>
                      <th>task desc</th>
                      <th>Completed by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completed.map((task, index) => (
                    <tr key={index}>
                      <td>{task.taskid}</td>
                      <td>{task.taskdesc}</td>
                      <td>{task.assignedto}</td>
                    </tr>
                     ))}
                 </tbody>
                </table>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className='text-center font-bold text-lg'>Pending</p>
                <div className='scrollable-table'>
                <table className='styled-table pending-tasks'>
                  <thead>
                    <tr>
                      <th>taskid</th>
                      <th>task desc</th>
                      <th>due date</th>
                      <th>Assigned to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((task, index) => (
                    <tr key={index}>
                      <td>{task.taskid}</td>
                      <td>{task.taskdesc}</td>
                      <td>{task.duedate}</td>
                      <td>{task.assignedto}</td>
                    </tr>
                     ))}
                 </tbody>
                </table>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className='text-center font-bold text-lg'>Late</p>
                <div className='scrollable-table'>
                <table className='styled-table late-tasks'>
                <thead>
                    <tr>
                      <th>taskid</th>
                      <th>task desc</th>
                      <th>due date</th>
                      <th>Assigned to</th>
                    </tr>
                  </thead>
                  <tbody >
                    {late.map((task, index) => (
                    <tr key={index}>
                      <td>{task.taskid}</td>
                      <td>{task.taskdesc}</td>
                      <td>{task.duedate}</td>
                      <td>{task.assignedto}</td>
                    </tr>
                     ))}
                 </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Coms teamid={params.teamid}/>
    </div>
  );
}

export default Task;
