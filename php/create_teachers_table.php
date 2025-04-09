<?php

include 'db_connect.php';

$sql = "CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    photo_path VARCHAR(255),
    gender VARCHAR(50),
    age INT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address_street1 VARCHAR(255),
    address_street2 VARCHAR(255),
    address_city VARCHAR(255),
    address_state VARCHAR(255),
    address_zip VARCHAR(50),
    qualification VARCHAR(255),
    teaching_area VARCHAR(255),
    classes VARCHAR(255),
    subjects VARCHAR(255),
    experience TEXT,
    location VARCHAR(255),
    referral VARCHAR(255),
    comments TEXT,
    cv_path VARCHAR(255),
    agree TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table `teachers` created successfully!";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>