"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// event handler
wss.on("connection", function (socket) {
    console.log("Ready to play");
    socket.on("message", (e) => {
        const message = e.toString("utf8").trim();
        console.log(message);
        console.log(message === "ping");
        if (message === "ping") {
            socket.send("bskd");
        }
    });
});
