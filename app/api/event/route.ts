import { authOptions } from "@/lb/authOptions";
import { isValidEvent } from "@/lb/eventValidation";
import { connectDB } from "@/lb/mongodb";
import events from "@/models/eventModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await req.json();
    if (!isValidEvent(body)) {
      return NextResponse.json(
        { message: "All event fields are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const newEvent = await events.create({
      eventName: body.eventName.trim(),
      description: body.description.trim(),
      eventDate: new Date(body.eventDate),
      venue: body.venue.trim(),
      eventType: body.eventType.trim(),
      status: body.status.trim(),
      owner: session.user.email,
    });

    return NextResponse.json(
      { message: "Event Added Successfully", data: newEvent },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to add event:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const allEvents = await events.find({ owner: session.user.email });
    return NextResponse.json({ message: "All events", data: allEvents });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
