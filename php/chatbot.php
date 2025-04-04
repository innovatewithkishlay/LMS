<?php
header("Content-Type: application/json");

require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    $userMessage = $input["message"] ?? "";

    if (empty($userMessage) || !is_string($userMessage)) {
        echo json_encode(["error" => "Invalid input. Message must be a non-empty string."]);
        exit;
    }

    if (strlen($userMessage) > 500) {
        echo json_encode(["error" => "Message is too long. Please limit your input to 500 characters."]);
        exit;
    }

    $GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    $payload = [
        "model" => "llama3-8b-8192",
        "messages" => [
            ["role" => "user", "content" => $userMessage]
        ]
    ];

    $ch = curl_init($GROQ_URL);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . GROQ_API_KEY,
        "Content-Type: application/json",
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); 

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("cURL Error: " . curl_error($ch), 3, "error_log.txt");

        echo json_encode(["error" => "Failed to connect to GROQ API."]);
        curl_close($ch);
        exit;
    }

    curl_close($ch);

    $responseData = json_decode($response, true);

    if (isset($responseData["error"])) {
        error_log("GROQ API Error: " . json_encode($responseData["error"]), 3, "error_log.txt");

        echo json_encode(["error" => $responseData["error"]]);
        exit;
    }

    $reply = $responseData["choices"][0]["message"]["content"] ?? "No response from the chatbot.";

    echo json_encode(["reply" => $reply]);
    exit;
}
http_response_code(405);
echo json_encode(["error" => "Method not allowed."]);
exit;
?>