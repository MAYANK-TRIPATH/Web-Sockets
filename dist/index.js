"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
//event handler
wss.on("connection", function (socket) {
    console.log("User coneeted");
    setInterval(() => {
        socket.send("Currentl you have" + Math.random());
    }, 1000);
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
