import { connectDB } from "@/lb/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

// ADD NOTE
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const newNote = await notes.create(body);

    return NextResponse.json(
      {
        message: "Note Added Successfully",
        data: newNote,
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Something went wrong",
        data: {},
      },
      { status: 500 },
    );
  }
}

// GET ALL NOTES
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const allNotes = await notes.find();

    return NextResponse.json(
      {
        message: "all notes",
        data: allNotes,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "Something went wrong",
        data: {},
      },
      { status: 500 },
    );
  }
}
