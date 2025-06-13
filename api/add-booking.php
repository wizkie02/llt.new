<?php
// Development placeholder for add-booking.php
// This file should exist on cPanel
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit();
}

// Generate booking reference number
$bookingReference = 'VN-' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);

// For development, just return success with booking reference
echo json_encode([
    'success' => true,
    'message' => 'Booking added successfully (development mode)',
    'id' => rand(1, 1000),
    'bookingReference' => $bookingReference
]);
?>
