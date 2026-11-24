import { connectDB } from "@/lb/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import users from "@/models/userModel"

//resgister controller :POST

export async function POST(req: NextRequest) {
 try{
    const body: unknown = await req.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ message: "Invalid registration details" }, { status: 400 });
    }

    const { name, email, password } = body as Record<string, unknown>;
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      name.trim().length < 2 ||
      password.length < 8 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { message: "Enter a valid name, email, and password of at least 8 characters" },
        { status: 400 },
      );
    }

    await connectDB();
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await users.findOne({ email: normalizedEmail });
    
    if(existingUser){
        return NextResponse.json({message:"Already registered..PLease login",data:{}},{status:409})
    }
    else{
        const encryptedPassword=await bcrypt.hash(password,10)
        await users.create({name:name.trim(),email:normalizedEmail,password:encryptedPassword})
        return NextResponse.json({message:"User registered successfully",data:{}},{status:201})

    }
 }  
 catch(err){
    console.log(err);
    return NextResponse.json({message:"Something went wrong",data:{}},{status:500})
 }
}