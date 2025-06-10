<?php
// update-tour.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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
    
    // Get the updated tour data from request body
    $input = getJsonInput();
    
    if (empty($input)) {
        sendResponse(['error' => 'No data provided for update'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if tour exists
    $checkStmt = $pdo->prepare("SELECT id FROM tours WHERE id = ?");
    $checkStmt->execute([$tourId]);
    
    if (!$checkStmt->fetch()) {
        sendResponse(['error' => 'Tour not found'], 404);
    }
    
    // Build dynamic update query
    $updateFields = [];
    $values = [];
    
    $allowedFields = [
        'name', 'description', 'price', 'duration', 'location', 'image', 
        'featured', 'category', 'rating', 'review_count', 'highlights', 
        'included', 'itinerary', 'what_to_bring', 'max_group_size', 'languages'
    ];
    
    foreach ($input as $key => $value) {
        // Convert camelCase to snake_case for database fields
        $dbField = strtolower(preg_replace('/([A-Z])/', '_$1', $key));
        
        if (in_array($dbField, $allowedFields)) {
            $updateFields[] = "$dbField = ?";
            
            // Handle special data types
            if (in_array($dbField, ['highlights', 'included', 'itinerary', 'what_to_bring'])) {
                $values[] = is_array($value) ? json_encode($value) : $value;
            } elseif ($dbField === 'price' || $dbField === 'rating') {
                $values[] = floatval($value);
            } elseif (in_array($dbField, ['review_count', 'max_group_size'])) {
                $values[] = intval($value);
            } elseif ($dbField === 'featured') {
                $values[] = (bool)$value;
            } else {
                $values[] = $value;
            }
        }
    }
    
    if (empty($updateFields)) {
        sendResponse(['error' => 'No valid fields provided for update'], 400);
    }
    
    // Add updated_at field
    $updateFields[] = "updated_at = NOW()";
    $values[] = $tourId; // For WHERE clause
    
    $sql = "UPDATE tours SET " . implode(', ', $updateFields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);
    
    sendResponse([
        'success' => true,
        'message' => 'Tour updated successfully',
        'affected_rows' => $stmt->rowCount()
    ]);
    
} catch (Exception $e) {
    error_log("Update tour error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
