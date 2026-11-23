import { connectDB } from "@/lb/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const noteDetails = await notes.findById(id);
    if (!noteDetails) {
      return NextResponse.json(
        {
          message: "Note not found",
          data: {},
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "note details",
        data: noteDetails,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Something went wrong",
        data: {},
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body=await req.json()
    const updatedNote=await notes.findByIdAndUpdate({_id:id},body,{new:true})
      return NextResponse.json({message:"Note Updated Successfully",data:updatedNote},{status:200})
    }

   catch (err) {
     console.log(err);
    return NextResponse.json({message: "Something went wrong",data: {},},{ status: 500 });
  }
}

