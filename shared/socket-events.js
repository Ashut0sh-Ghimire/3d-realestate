// Socket.IO event names for live chat. Client emits/listens with these, server too.
export const SOCKET_EVENTS = {
  JOIN_CONVERSATION: "chat:join", // client -> server  { conversationId }
  SEND_MESSAGE: "chat:send", // client -> server  { conversationId, body }
  NEW_MESSAGE: "chat:new", // server -> client  Message
  TYPING: "chat:typing", // both ways         { conversationId, userId }
  ERROR: "chat:error", // server -> client  { error }
};
