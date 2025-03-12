"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString()); // Ensure message is string
            if (parsedMessage.type === "join") {
                const roomId = parsedMessage.payload.roomId;
                console.log(`User joined room: ${roomId}`);
                users.push({ socket, room: roomId });
            }
            if (parsedMessage.type === "chat") {
                const user = users.find((user) => user.socket === socket);
                if (!user)
                    return;
                console.log("Broadcasting message in room:", user.room);
                users
                    .filter((u) => u.room === user.room)
                    .forEach((u) => u.socket.send(parsedMessage.payload.message));
            }
        }
        catch (error) {
            console.error("Error parsing message:", error);
        }
    });
});
