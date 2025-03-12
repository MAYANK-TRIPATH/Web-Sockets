import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", payload: { roomId: "red" } }));
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    wsRef.current = ws;

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const message = inputRef.current?.value.trim();
    if (message && wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: "chat", payload: { message } }));
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="m-4">
            <span className="bg-white text-black rounded p-4">{message}</span>
          </div>
        ))}
      </div>

      <div className="w-full bg-white flex p-4">
        <input ref={inputRef} className="flex-1 p-2 border" />
        <button onClick={sendMessage} className="bg-purple-600 text-white p-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
