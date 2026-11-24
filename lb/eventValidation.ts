export interface EventInput {
  eventName: string;
  description: string;
  eventDate: string;
  venue: string;
  eventType: string;
  status: string;
}

export function isValidEvent(value: unknown): value is EventInput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;
  return (
    typeof event.eventName === "string" &&
    event.eventName.trim().length > 0 &&
    typeof event.description === "string" &&
    event.description.trim().length > 0 &&
    typeof event.eventDate === "string" &&
    !Number.isNaN(Date.parse(event.eventDate)) &&
    typeof event.venue === "string" &&
    event.venue.trim().length > 0 &&
    typeof event.eventType === "string" &&
    event.eventType.trim().length > 0 &&
    typeof event.status === "string" &&
    event.status.trim().length > 0
  );
}
