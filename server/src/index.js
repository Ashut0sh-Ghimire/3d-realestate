// Starts the HTTP server and attaches Socket.IO (live chat) to it.
import { createServer } from "node:http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { registerChatSocket } from "./modules/chat/chat.socket.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: env.CLIENT_URL } });
registerChatSocket(io);

httpServer.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});
