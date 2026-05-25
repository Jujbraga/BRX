<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.brxconsulting.se');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Sanitize & validate input
$fname   = trim(strip_tags($_POST['first_name'] ?? ''));
$lname   = trim(strip_tags($_POST['last_name']  ?? ''));
$email   = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$phone   = trim(strip_tags($_POST['phone']       ?? ''));
$enquiry = trim(strip_tags($_POST['enquiry_type'] ?? ''));
$message = trim(strip_tags($_POST['message']     ?? ''));
$gdpr    = $_POST['gdpr_consent'] ?? '';

// Required fields
if (!$fname || !$email || !$enquiry || !$message || !$gdpr) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Build the email

$to      = 'info@brxconsulting.se';
$subject = "New contact enquiry from {$fname} {$lname}";

$body  = "You have received a new message via brxconsulting.se\n\n";
$body .= "-------------------------------------------\n";
$body .= "Name:    {$fname} {$lname}\n";
$body .= "Email:   {$email}\n";
$body .= "Phone:   " . ($phone ?: '—') . "\n";
$body .= "Type:    {$enquiry}\n";
$body .= "-------------------------------------------\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "-------------------------------------------\n";
$body .= "GDPR consent given: Yes\n";
$body .= "Sent from: brxconsulting.se/contact.html\n";

$headers  = "From: noreply@brxconsulting.se\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send

if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
