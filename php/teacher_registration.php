<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = []; 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {    
    try {
        $firstName = $_POST['firstName'] ?? null;
        $lastName = $_POST['lastName'] ?? null;
        $gender = $_POST['gender'] ?? null;
        $age = $_POST['age'] ?? null;
        $email = $_POST['email'] ?? null;
        $phone = $_POST['phone'] ?? null;

        if (!preg_match('/^\d{10}$/', $phone)) {
            throw new Exception("Phone number must be exactly 10 digits.");
        }

        $addressStreet1 = $_POST['address']['street1'] ?? null;
        $addressStreet2 = $_POST['address']['street2'] ?? null;
        $addressCity = $_POST['address']['city'] ?? null;
        $addressState = $_POST['address']['state'] ?? null;
        $addressZip = $_POST['address']['zip'] ?? null;
        $qualification = $_POST['qualification'] ?? null;
        $teachingArea = $_POST['teachingArea'] ?? null;
        $classes = $_POST['classes'] ?? null;
        $subjects = $_POST['subjects'] ?? null;
        $experience = $_POST['experience'] ?? null;
        $location = $_POST['location'] ?? null;
        $referral = $_POST['referral'] ?? null;
        $comments = $_POST['comments'] ?? null;
        $agree = isset($_POST['agree']) ? 1 : 0;
        $photoPath = null;
        $cvPath = null;

        error_log("Received Data: " . print_r($_POST, true));
        error_log("Uploaded Files: " . print_r($_FILES, true));

        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $photoPath = 'uploads/photos/' . uniqid() . '_' . basename($_FILES['photo']['name']);
            if (!move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath)) {
                throw new Exception("Failed to upload photo.");
            }
        }

        if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
            $cvPath = 'uploads/cvs/' . uniqid() . '_' . basename($_FILES['cv']['name']);
            if (!move_uploaded_file($_FILES['cv']['tmp_name'], $cvPath)) {
                throw new Exception("Failed to upload CV.");
            }
        }

        $sql = "INSERT INTO teachers (
                    first_name, last_name, photo_path, gender, age, email, phone,
                    address_street1, address_street2, address_city, address_state, address_zip,
                    qualification, teaching_area, classes, subjects, experience, location,
                    referral, comments, cv_path, agree
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )";

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . $conn->error);
        }

        $stmt->bind_param(
            "ssssissssssssssssssssi",
            $firstName, $lastName, $photoPath, $gender, $age, $email, $phone,
            $addressStreet1, $addressStreet2, $addressCity, $addressState, $addressZip,
            $qualification, $teachingArea, $classes, $subjects, $experience, $location,
            $referral, $comments, $cvPath, $agree
        );

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Teacher registration successful!";
        } else {
            throw new Exception("Database error: " . $stmt->error);
        }

        $stmt->close();
    } catch (Exception $e) {
        http_response_code(500); 
        $response['success'] = false;
        $response['message'] = $e->getMessage();
        error_log("Error: " . $e->getMessage()); 
    } finally {
        $conn->close();
    }
} else {
    http_response_code(405); 
    $response['success'] = false;
    $response['message'] = "Invalid request method.";
}

echo json_encode($response);
?>
