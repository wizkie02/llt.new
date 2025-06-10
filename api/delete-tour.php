<?php
// delete-tour.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

try {
    // Validate JWT token
    $payload = validateJWTAuth();
    
    // Get tour ID from query parameter
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendResponse(['error' => 'Tour ID is required'], 400);
    }
    
    $tourId = $_GET['id'];
    
    $pdo = getDBConnection();
    
    // Check if tour exists
    $checkStmt = $pdo->prepare("SELECT id, name FROM tours WHERE id = ?");
    $checkStmt->execute([$tourId]);
    $tour = $checkStmt->fetch();
    
    if (!$tour) {
        sendResponse(['error' => 'Tour not found'], 404);
    }
    
    // Delete the tour
    $deleteStmt = $pdo->prepare("DELETE FROM tours WHERE id = ?");
    $deleteStmt->execute([$tourId]);
    
    sendResponse([
        'success' => true,
        'message' => 'Tour deleted successfully',
        'deleted_tour' => [
            'id' => $tour['id'],
            'name' => $tour['name']
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Delete tour error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
