<?php

include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $addressStreet1 = $_POST['address']['street1'];
    $addressStreet2 = $_POST['address']['street2'];
    $addressCity = $_POST['address']['city'];
    $addressState = $_POST['address']['state'];
    $addressZip = $_POST['address']['zip'];
    $qualification = $_POST['qualification'];
    $teachingArea = $_POST['teachingArea'];
    $classes = $_POST['classes'];
    $subjects = $_POST['subjects'];
    $experience = $_POST['experience'];
    $location = $_POST['location'];
    $referral = $_POST['referral'];
    $comments = $_POST['comments'];
    $agree = isset($_POST['agree']) ? 1 : 0;

    $photoPath = null;
    $cvPath = null;

    // Upload photo
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $photoPath = 'uploads/photos/' . uniqid() . '_' . basename($_FILES['photo']['name']);
        move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
    }

    // Upload CV
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
        $cvPath = 'uploads/cvs/' . uniqid() . '_' . basename($_FILES['cv']['name']);
        move_uploaded_file($_FILES['cv']['tmp_name'], $cvPath);
    }

    // Insert data into the database
    $sql = "INSERT INTO teachers (
                first_name, last_name, photo_path, gender, age, email, phone,
                address_street1, address_street2, address_city, address_state, address_zip,
                qualification, teaching_area, classes, subjects, experience, location,
                referral, comments, cv_path, agree
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssisssssssssssssssi",
        $firstName, $lastName, $photoPath, $gender, $age, $email, $phone,
        $addressStreet1, $addressStreet2, $addressCity, $addressState, $addressZip,
        $qualification, $teachingArea, $classes, $subjects, $experience, $location,
        $referral, $comments, $cvPath, $agree
    );

    if ($stmt->execute()) {
        echo "Teacher registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>