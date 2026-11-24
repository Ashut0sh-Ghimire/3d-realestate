// Live chat over Socket.IO. Owner: M5. Event names: shared/socket-events.js.
import { SOCKET_EVENTS } from "@realestate/shared";

export function registerChatSocket(io) {
  io.on("connection", (socket) => {
    // TODO: authenticate the socket with the JWT (socket.handshake.auth.token)

    socket.on(SOCKET_EVENTS.JOIN_CONVERSATION, ({ conversationId }) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async ({ conversationId, body }) => {
      // TODO: save to the messages table via chat.service.js, then broadcast the saved row
      io.to(`conversation:${conversationId}`).emit(SOCKET_EVENTS.NEW_MESSAGE, {
        conversationId,
        body,
        createdAt: new Date().toISOString(),
      });
    });
  });
}
