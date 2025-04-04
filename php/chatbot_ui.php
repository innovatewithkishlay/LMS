<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chatbot</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: rgba(0, 0, 0, 0.5); /* Dim background when chatbot is open */
        }
        .chatbot-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        .chatbot-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            width: 300px;
            height: 100%;
            background-color: #f9f9f9;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            z-index: 1000;
        }
        .chatbot-header {
            background-color: #2563eb;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chatbot-header .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }
        .chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
        }
        .chatbot-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ddd;
        }
        .chatbot-input input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .chatbot-input button {
            margin-left: 10px;
            padding: 8px 12px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .chatbot-input button:hover {
            background-color: #1e4db7;
        }
        .message {
            margin-bottom: 10px;
        }
        .message.user {
            text-align: right;
        }
        .message.bot {
            text-align: left;
        }
        .message span {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 4px;
        }
        .message.user span {
            background-color: #2563eb;
            color: white;
        }
        .message.bot span {
            background-color: #f1f1f1;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="chatbot-overlay" onclick="closeChatbot()"></div>
    <div id="chatbot" class="chatbot-sidebar">
        <div class="chatbot-header">
            <span>AI Chatbot</span>
            <button class="close-btn" onclick="closeChatbot()">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
            <div class="message bot">
                <span>How can I help you in your studies?</span>
            </div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatbotInput" placeholder="Type your message..." onkeydown="handleKeyPress(event)">
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>

    <script>
        const chatbotMessages = document.getElementById("chatbotMessages");
        const chatbotInput = document.getElementById("chatbotInput");

        function sendMessage() {
            const userMessage = chatbotInput.value.trim();
            if (!userMessage) return;

            // Add user message to the chat
            addMessage("user", userMessage);
            chatbotInput.value = "";

            fetch("http://localhost:8000/chatbot.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        addMessage("bot", "Sorry, something went wrong.");
                    } else {
                        addMessage("bot", data.reply);
                    }
                })
                .catch(() => {
                    addMessage("bot", "Unable to connect to the server.");
                });
        }

        function addMessage(sender, text) {
            const message = document.createElement("div");
            message.className = `message ${sender}`;
            message.innerHTML = `<span>${text}</span>`;
            chatbotMessages.appendChild(message);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function closeChatbot() {
            document.querySelector(".chatbot-overlay").style.display = "none";
            document.getElementById("chatbot").style.display = "none";
        }

        function handleKeyPress(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        }
    </script>
</body>
</html>