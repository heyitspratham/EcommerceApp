import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"

//Uncaught Error
process.on("uncaughtException", (err)=>{
    console.log(`ERROR: ${err.message}`);
    console.log("shutting down the server due to Uncaught Exception");
    server.close(()=>{
        process.exit(1)
})
})

//setting config path
dotenv.config({path: "backend/config/config.env"})

//connecting to the database
connectDB();


const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is working on port: ${process.env.PORT}`);
})


//Unhandeled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`ERROR: ${err.message}`);
    console.log("shutting down the server due to unhandeled promise rejection");
    server.close(()=>{
        process.exit(1)
})
})