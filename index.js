const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();

const {connection}=require("./db");
const userRoute = require("./Route/user.route");
const noteRoute =require("./Route/note.route");
app.use(express.json());
app.use(cors());
app.use("/user",userRoute);
app.use("/note",noteRoute);

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"this is the homepage"})
});

app.listen(process.env.PORT,async()=>{

    try {
        await connection;
        console.log("db is running")
        console.log("server is running")
    } catch (error) {
        
    }
})
