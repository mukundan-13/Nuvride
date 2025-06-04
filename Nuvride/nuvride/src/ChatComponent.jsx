import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { type: "user", text: input };

    try {
      const response = await axios.post("http://localhost:8085/api/chat", {
        question: input,
      });
      const botMsg = { type: "bot", text: response.data.answer };
      setChat((prevChat) => [...prevChat, userMsg, botMsg]);
      setInput("");
    } catch (error) {
      setChat((prevChat) => [
        ...prevChat,
        userMsg,
        { type: "bot", text: "Error fetching answer." },
      ]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-6 rounded-xl shadow-2xl bg-gradient-to-br from-white to-gray-100">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Ask AI</h1>

      <div
        ref={chatRef}
        className="h-96 overflow-y-auto p-4 space-y-4 border rounded-lg bg-white"
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                msg.type === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask me something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
