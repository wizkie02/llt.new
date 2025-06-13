<?php
// Development placeholder for delete-booking.php
// This file should exist on cPanel
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing booking ID']);
    exit();
}

$id = $_GET['id'];

// For development, just return success
echo json_encode([
    'success' => true,
    'message' => 'Booking deleted successfully (development mode)',
    'id' => $id
]);
?>
