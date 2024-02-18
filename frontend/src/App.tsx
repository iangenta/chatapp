import { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [[message], ...state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages((state) => [[newMessage], ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-[rgb(255,10,100)] text-white flex items-end justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-10 border rounded text-gray-900"
      >
        <h1 className="text-2xl font-bold my-2">CoiChat</h1>
        <ul className="h-80 overflow-y-auto">
          {messages.map((messageGroup, index) => (
            <li key={index}>
              {messageGroup.map((message, idx) => (
                <div
                  key={idx}
                  className={`my-2 p-2 table text-sm rounded-md ${
                    message.from === "Me"
                      ? " bg-[rgb(255,102,193)] ml-auto text-white "
                      : "bg-white text-black"
                  }`}
                >
                  <b className="block">{message.from}:</b>
                  {message.body}
                </div>
              ))}
            </li>
          ))}
        </ul>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={message}
          autoFocus
        />
      </form>
    </div>
  );
}
