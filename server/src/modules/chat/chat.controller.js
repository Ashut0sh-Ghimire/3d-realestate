// CHAT controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in chat.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// GET /api/chat/conversations   (logged in)
// in:  -
// out: 200 { items: Conversation[] }
export const conversations = notImplemented("GET /api/chat/conversations");

// POST /api/chat/conversations   (logged in)
// in:  { listingId }
// out: 201 { conversation: Conversation }
export const start = notImplemented("POST /api/chat/conversations");

// GET /api/chat/conversations/:id/messages   (participant)
// in:  query: ?before (for older pages)
// out: 200 { items: Message[] }
export const messages = notImplemented("GET /api/chat/conversations/:id/messages");
