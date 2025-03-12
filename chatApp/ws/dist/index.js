"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        // @ts-ignore
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "join") {
            console.log("user joined the Room" + parseMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parseMessage.payload.roomId
            });
        }
        if (parseMessage.type == "chat") {
            console.log("User wants to chat");
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currentUserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send(parseMessage.payload.message);
                }
            }
        }
    });
});
