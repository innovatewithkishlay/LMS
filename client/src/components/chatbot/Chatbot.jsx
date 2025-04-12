import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you in your studies?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chatbot.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } else {
        const formattedReply = formatResponse(data.reply);
        setMessages([...newMessages, { sender: "bot", text: formattedReply }]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Unable to connect to the server. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the chatbot's response (no truncation)
  const formatResponse = (response) => {
    // Replace **text** with <b>text</b> for bold formatting
    return response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    if (!isUserScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detect user scrolling
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 10); // Check if user is near the bottom
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h2 className="text-lg font-bold">AI Chatbot</h2>
        <button
          onClick={onClose}
          className="text-xl font-bold hover:text-gray-300 transition"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4"
        onScroll={handleScroll} // Track user scrolling
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              dangerouslySetInnerHTML={{
                __html: message.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
              }}
            ></span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Marker for the end of messages */}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
