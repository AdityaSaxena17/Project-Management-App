import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// import {Client} from "pg";
import fs from "fs";
import db from "./index.js"

const port=3000
const app=express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// const db=new pg.Client({
//   user: "postgres",
//   host: "https://nlmgositxcxhfdrszssq.supabase.co",
//   password: "89FY6PNXVma#dU5",
//   database: "TMA",
//   port: 5432,
// });

// const connectionString ='postgres://avnadmin:AVNS_yUoPX5fqxL8xKIKf84n@pg-fe3194c-project-5c5d.a.aivencloud.com:23786/defaultdb?sslmode=require';

// const client = new pg.Client({
//   connectionString: connectionString,
//   ssl: {
//     rejectUnauthorized: true, // Ensures that the certificate is valid
//     ca: fs.readFileSync('ca.pem').toString(), // Path to the CA certificate
//   },
// });
// let db;

// console.log("HELLLO WORLD")
// const dbconnect = async () => {
//     console.log("RESTARTTTTT")
//     db= await client.connect();
//     console.log(db);
// }

// const connectionString = "postgres://postgres.nlmgositxcxhfdrszssq:-5aptwidwX?sZ5v@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";

// const client = new pg.Client({
//   connectionString: connectionString,
// });

// const client = new Client({
//     connectionString:postgres:"postgres.nlmgositxcxhfdrszssq:-5aptwidwX?sZ5v@aws-0-ap-south-1.pooler.supabase.com:6543/postgres", // Load the URI from the environment variables
//     ssl: {
//       rejectUnauthorized: false, // Allow self-signed certificates (typical for managed databases like Supabase)
//     },
//   });
  
//   // Connect to the database
//   client.connect()
//     .then(() => console.log('Connected to Supabase PostgreSQL'))
//     .catch(err => console.error('Connection error', err.stack));


// let db;


app.get("/test", async (req, res) => {
    try {
        await db.query("CREATE TABLE IF NOT EXISTS test(sno INT, name VARCHAR(255))");
        res.send("Table created successfully.");
    } catch (error) {
        console.error("Error creating table:", error);
        res.status(500).send("Error creating table.");
    }
});

app.listen(port, async () => {
    console.log(`Listening to port ${port}`);
    db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });
   
});

app.post("/api/getcoms", async (req, res) => {
    try {
        console.log("in getcoms");
        
        const result = await db.query(
            "SELECT * FROM messages WHERE teamid = $1 AND type = $2",
            [req.body.teamid, req.body.type]
        );

        // Send the result as JSON
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send({ error: "An error occurred while fetching messages." });
    }
});

// app.use(()=>{
//     console.log("incoms")
// })


app.post("/api/sendcoms", async (req, res) => {
    console.log("in sendcoms");
    try {
        const date = new Date();
        await db.query("INSERT INTO messages (teamid, message, name, type, date) VALUES ($1, $2, $3, $4, $5)", [
            req.body.teamid,
            req.body.message,
            req.body.name,
            req.body.type,
            date
        ]);
        res.status(200).json({ message: "Message sent successfully" }); // Send a success response
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: "An error occurred while sending the message" }); // Send an error response
    }
});

// app.post("/api/sendcoms", async (req, res) => {
//     try {
//         console.log("in sendcoms")
//         await db.query("INSERT INTO messages (teamid,name, message, type) VALUES ($1, $2, $3, $4)", [
//             req.body.teamid,
//             req.body.name,
//             req.body.message,
//             req.body.type
//         ]);
//         res.status(200).json({ success: true }); // Respond with success
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" }); // Respond with an error
//     }
// });



app.post("/api/login",async (req,res)=>{
    // console.log(req.body)
    const result=await db.query("select * from users where username=$1 and password=$2",[req.body.username,req.body.password])
    // console.log(result.rows)
    if(result.rows.length>0){
        res.json({flag:true,userid:result.rows[0].id})
    }
    else{
        res.json({flag:false})
    }
})

app.post("/api/teamslist",async (req,res)=>{
    try{
        const result= await db.query("select * from teams where $1=clerkid1 or $1=clerkid2 or $1=clerkid3 or $1=clerkid4 or $2=teamleader",[req.body.userid,req.body.username])
        // console.log(result.rows)
        res.json(result.rows)
    }
    catch(error){
        console.log(error)
    }
})

app.post("/api/createteam",async (req,res)=>{
    
    try{
        const { teamname, teamleadername, memberid1, memberid2, memberid3, memberid4, membername1, membername2, membername3, membername4 } = req.body;
        console.log(req.body)

        if (!teamname || teamleadername=="Guest" || !memberid1 || !membername1 || !memberid2 || !membername2 || !memberid3 || !membername3 || !memberid4 || !membername4) {
          return res.json({ flag: false, message: 'Missing required fields' });
        }


        await db.query("insert into teams(teamname,teamleader,memberid1,memberid2,memberid3,memberid4,clerkid1,clerkid2,clerkid3,clerkid4,membername1,membername2,membername3,membername4) values($1,$2,1,2,3,4,$3,$4,$5,$6,$7,$8,$9,$10)",[
            req.body.teamname,
            req.body.teamleadername,
            req.body.memberid1,
            req.body.memberid2,
            req.body.memberid3,
            req.body.memberid4,
            req.body.membername1,
            req.body.membername2,
            req.body.membername3,
            req.body.membername4,
        ])
        
        res.json({flag:true})
    }
    catch(error){
        res.json({flag:false})
        console.log(error)
    }
})

app.post("/api/assigntask",async (req,res)=>{
    try{
        await db.query("insert into tasks(taskdesc,assignedto,duedate,teamid,status) values($1,$2,$3,$4,'pending')",[
            req.body.taskdesc,
            req.body.memberid,
            req.body.duedate,
            req.body.teamid
        ])
        res.json({flag:true})
    }
    catch(error){
        console.log(error)
        res.json({flag:false})
    }
})

app.post("/api/teamslist/get",async (req,res)=>{
    try{
        const result=await db.query("select * from teams where teamid=$1",[req.body.teamid])
        res.json(result.rows[0])
    }
    catch(error){
        console.log(error)
    }
})

app.post("/api/pending",async (req,res)=>{
    try{
        const date=new Date()
        const result = await db.query("SELECT * FROM tasks WHERE status = 'pending' AND teamid = $1 AND $2<=duedate", [req.body.teamid,date]);
        // console.log(result.rows)
        res.json(result.rows)
    }
    catch(error){
        console.log(error)
    }

})

app.post("/api/completed",async (req,res)=>{
    try{
        const result=await db.query("select * from tasks where status='completed' and teamid=$1",[req.body.teamid])
        res.json(result.rows)
    }
    catch(error){
        console.log(error)
    }
    
})

app.post("/api/late",async (req,res)=>{
    try{
        const date=new Date()
        const result=await db.query("select * from tasks where status='pending' and $1>=duedate and teamid=$2",[date,req.body.teamid])
        res.json(result.rows)
    }
    catch(error){
        console.log(error)
    }
})

app.patch("/api/updatecount",async (req,res)=>{
    try{
        const s=req.body.tasksby
        await db.query(`update teams set ${s}=$1 where teamid=$2`,[req.body.count,req.body.teamid])
        // console.log("hello",s)
        res.json(s)
    }
    catch(error){
        console.log(error)
    }
})

app.patch("/api/donetask",async (req,res)=>{
    try{
        // console.log(req.body.taskid)
        await db.query("update tasks set status='completed' where taskid=$1",[req.body.taskid])
        res.json({flag:true})
    }
    catch(error){
        console.log(error)
        res.json({flag:false})
    }
})

app.post("/api/gettasks",async (req,res)=>{
    try{
        
        console.log(req.body.userid,req.body.teamid)
        const r=await db.query("select ")
        const result=await db.query("select * from tasks where status='pending' and assignedto=$1 and teamid=$2",[req.body.userid,req.body.teamid])
        // console.log(result.rows)
        res.json(result.rows)
    }
    catch(error){
        console.log(error)
    }
})



app.post("/api/gettuid",async (req,res)=>{
    const result=await db.query("select clerkid1,clerkid2,clerkid3,clerkid4 from teams where teamid=$1",[req.body.teamid]);
    console.log(result.rows[0]);
    res.json(result.rows[0]);
})

// app.listen(port,async ()=>{
//     console.log(`Listening to port ${port}`)
//     db= await client.connect();
// })