import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

const users: User[] = [];

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
                if (!user) return;

                console.log("Broadcasting message in room:", user.room);
                users
                    .filter((u) => u.room === user.room)
                    .forEach((u) => u.socket.send(parsedMessage.payload.message));
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });
});
