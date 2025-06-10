<?php
// add-tour.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

try {
    // Validate JWT token
    $payload = validateJWTAuth();
    
    // Get the tour data from request body
    $input = getJsonInput();
    
    // Validate required fields
    $requiredFields = ['name', 'description', 'price', 'duration', 'location', 'category'];
    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || empty(trim($input[$field]))) {
            sendResponse(['error' => "Field '$field' is required"], 400);
        }
    }
    
    $pdo = getDBConnection();
    
    // Prepare the SQL statement
    $sql = "INSERT INTO tours (name, description, price, duration, location, image, featured, category, rating, review_count, highlights, included, itinerary, what_to_bring, max_group_size, languages, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    
    $stmt = $pdo->prepare($sql);
    
    // Execute with the provided data
    $stmt->execute([
        $input['name'],
        $input['description'],
        floatval($input['price']),
        $input['duration'],
        $input['location'],
        $input['image'] ?? '',
        isset($input['featured']) ? (bool)$input['featured'] : false,
        $input['category'],
        isset($input['rating']) ? floatval($input['rating']) : null,
        isset($input['reviewCount']) ? intval($input['reviewCount']) : null,
        isset($input['highlights']) ? json_encode($input['highlights']) : null,
        isset($input['included']) ? json_encode($input['included']) : null,
        isset($input['itinerary']) ? json_encode($input['itinerary']) : null,
        isset($input['whatToBring']) ? json_encode($input['whatToBring']) : null,
        isset($input['maxGroupSize']) ? intval($input['maxGroupSize']) : null,
        $input['languages'] ?? null
    ]);
    
    $tourId = $pdo->lastInsertId();
    
    sendResponse([
        'success' => true,
        'message' => 'Tour added successfully',
        'tour_id' => $tourId
    ]);
    
} catch (Exception $e) {
    error_log("Add tour error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
