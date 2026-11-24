// Frontend side of the CHAT module. History over REST, live messages over Socket.IO.
// Event names come from SOCKET_EVENTS in shared/socket-events.js.
import { API, buildPath } from "@realestate/shared";
import { request } from "./api.js";

export const getConversations = () => request("GET", API.CHAT.CONVERSATIONS).then((d) => d.items);
export const startConversation = (listingId) =>
  request("POST", API.CHAT.START, { body: { listingId } }).then((d) => d.conversation);
export const getMessages = (conversationId, before) =>
  request("GET", buildPath(API.CHAT.MESSAGES, { id: conversationId }), { query: { before } }).then(
    (d) => d.items,
  );
