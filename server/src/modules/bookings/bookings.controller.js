// BOOKINGS controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in bookings.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// POST /api/bookings   (logged in)
// in:  { listingId, kind: "viewing" | "stay", date, checkOut?, message }
// out: 201 { booking: Booking }
export const create = notImplemented("POST /api/bookings");

// GET /api/bookings/mine   (logged in)
// in:  query: ?as=seller (bookings on my listings instead of bookings I made)
// out: 200 { items: Booking[] }
export const mine = notImplemented("GET /api/bookings/mine");

// PATCH /api/bookings/:id/status   (listing owner)
// in:  { status }
// out: 200 { booking: Booking }
export const updateStatus = notImplemented("PATCH /api/bookings/:id/status");
