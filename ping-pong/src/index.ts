import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on("connection", function (socket) {
    console.log("Ready to play");

    socket.on("message", (e) => {
        const message = e.toString("utf8").trim();
        console.log(message);
        console.log(message === "ping"); 

        if (message === "ping") {
            socket.send("pong");
        }
    });
});










