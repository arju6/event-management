import mongoose from "mongoose";

interface Event {
  eventName: string;
  description: string;
  eventDate: Date;
  venue: string;
  eventType: string;
  status: string;
  owner: string;
}

const eventSchema = new mongoose.Schema<Event>({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  venue: { type: String, required: true },
  eventType: { type: String, required: true },
  status: { type: String, required: true },
  owner: { type: String, required: true },
});

export default mongoose.models.events ||
  mongoose.model<Event>("events", eventSchema);
