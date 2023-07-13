import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`database connected at: ${data.connection.host}`);
    })
}