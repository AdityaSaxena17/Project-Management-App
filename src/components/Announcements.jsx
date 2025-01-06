import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./styledtable.css";
import { useSelector } from 'react-redux';

function Announcements() {
    const params = useParams();
    const [teamLeader, setTeamLeader] = useState('');
    const [members, setMembers] = useState([]);
    const user = useSelector((state) => state.user.activeUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [teamleaderflag, setTeamLeaderFlag] = useState(false);

    const fetchTeam = async () => {
        try {
            const result = await axios.post('/api/teamslist/get', { teamid: params.teamid });
            setTeamLeader(result.data.teamleader);
            setTeamLeaderFlag(result.data.teamleader === user);
            console.log("HELLO:", result.data);
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

    const fetchMessages = async () => {
        try {
            const result = await axios.post("/api/getcoms", { teamid: params.teamid, type: "announcement" });
            setMessages(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTeam();
        fetchMessages();
    }, [params.teamid, user]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            if (newMessage.trim()) {
                const timestamp = new Date().toLocaleString(); // Get current date and time
                await axios.post("/api/sendcoms", {
                    teamid: params.teamid,
                    type: "announcement",
                    name: user,
                    message: newMessage,
                    date: timestamp // Send date with the message
                });

                setMessages([...messages, { message: newMessage, date: timestamp }]); // Add date to the message object
                setNewMessage(""); // Clear the input after sending
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='h-[90vh] w-full flex'>
            {/* Team Leader and Members Table */}
            <div className='w-1/4 h-[80vh] flex justify-center'>
                <div className='ml-5 w-full'>
                    <p className='text-2xl font-extrabold mt-5'>Team Leader: {teamLeader}</p>
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
                </div>
            </div>

            {/* Announcements Section */}
            <div className='w-3/4 h-[80vh] p-5 flex flex-col'>
                <h1 className='text-2xl font-extrabold mt-5 ml-10'>Announcements</h1>
                <div className='flex-grow overflow-y-auto'> {/* Make announcements scrollable */}
                    {messages.map((msg, index) => (
                        <div key={index} className="my-7">
                            {/* Team Leader with Icon */}
                            <div className="flex items-center space-x-3 ml-5">
                                <img
                                    className="h-8"
                                    src="../../src/assets/user-svgrepo-com.svg"
                                    alt="User Icon"
                                />
                                <p className="font-semibold text-gray-800">{teamLeader}</p>
                            </div>
                            
                            {/* Message Content with Date */}
                            <div className="bg-slate-400 p-5 ml-5 mt-2 rounded">
                                <p>{msg.message}</p>
                                <p className="text-xs text-gray-600">{msg.date}</p> {/* Display the date */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Text Input for Chatting */}
                {teamleaderflag && ( // Show input only if the user is a team leader
                    <form onSubmit={handleSendMessage} className="flex items-center mt-5">
                        <input
                            type="text"
                            className="w-full p-3 border h-10 rounded-l focus:outline-none"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={handleMessageChange}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-r"
                        >
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Announcements;
