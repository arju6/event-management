import { isValidObjectId } from "mongoose";
import { authOptions } from "@/lb/authOptions";
import { isValidEvent } from "@/lb/eventValidation";
import { connectDB } from "@/lb/mongodb";
import events from "@/models/eventModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    await connectDB();
    const event = await events.findOne({ _id: id, owner: session.user.email });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event details", data: event });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const body: unknown = await req.json();
    if (!isValidEvent(body)) {
      return NextResponse.json(
        { message: "All event fields are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const updatedEvent = await events.findOneAndUpdate(
      { _id: id, owner: session.user.email },
      {
        eventName: body.eventName.trim(),
        description: body.description.trim(),
        eventDate: new Date(body.eventDate),
        venue: body.venue.trim(),
        eventType: body.eventType.trim(),
        status: body.status.trim(),
      },
      { new: true, runValidators: true },
    );
    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event Updated Successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    await connectDB();
    const deletedEvent = await events.findOneAndDelete({
      _id: id,
      owner: session.user.email,
    });
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event Deleted Successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
