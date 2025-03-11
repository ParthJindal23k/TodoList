const express = require("express");
const app =express();
const mongoose = require("mongoose"); 
const TodoRoute = require("./routes/todo.route")
const UserRoute = require("./routes/user.route")
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const port = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;


try{
     mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
}
catch(error){
    console.log(error);
}

app.use(cors());         

app.use(express.json());
app.use("/todo",TodoRoute)
app.use("/user",UserRoute);


app.listen(port,()=>{
    console.log("Server is running on the port", `${port}`);
})