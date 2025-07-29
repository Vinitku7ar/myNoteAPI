//we need to use express library so we need to import express library
const express = require("express");
//with help of express ,we create app object and this app object call method for us
const app = express();
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

const mongoose= require("mongoose");







const userRouter=require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes")

app.use(express.json());

app.use(cors());

//to use router in index ,we need to import
app.use("/users",userRouter);

app.use("/notes",noteRouter);

//To start a server service we need port no. and listen (action handler)
app.get("/",(req,res)=>{
        res.send("hello this is my first api")
});

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
       app.listen(PORT,()=>{
    console.log("Server started on Port Number "+PORT);
});
})
.catch((error)=>{
    console.log(error);
})  

//without declaring any http method ,server does nothing 

