import { connectDB } from "@/lb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import users from "@/models/userModel"

//resgister controller :POST

export async function POST(req: NextRequest) {
 try{
     await connectDB();
    const { name, email, password } = await req.json();
    const existingUser=await users.findOne({email})
    
    if(existingUser){
        return NextResponse.json({message:"Already registered..PLease login",data:{}},{status:409})
    }
    else{
        const encryptedPassword=await bcrypt.hash(password,10)
        const newUser=await users.create({name,email,password:encryptedPassword})
        return NextResponse.json({message:"User registered succesfully",data:newUser},{status:201})

    }
 }  
 catch(err){
    console.log(err);
    return NextResponse.json({message:"Something went wrong",data:{}},{status:500})
 }
}