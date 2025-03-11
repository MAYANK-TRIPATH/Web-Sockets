import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080});

//event handler
wss.on("connection", function(socket) {
    console.log("User coneeted")
    setInterval(() => {
        socket.send("Currentl you have" + Math.random());
    },1000)

    socket.on("message", (e) => {  // Message send by Client
        console.log(e.toString());
    })
})