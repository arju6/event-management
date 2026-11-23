
import mongoose from "mongoose";
const connectionString = process.env.DB_CONNECTION_STRING as string;
export const connectDB=async()=>{
    try{
         const res= await mongoose.connect(connectionString)
         console.log("DB connection successful");
    }
    catch(err){
        console.error("DB connection failed");
        console.log(err);
        throw err;
    }
} 
