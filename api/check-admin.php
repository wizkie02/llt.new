<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

require_once 'config.php';

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        exit();
    }
    
    $email = trim($input['email']);
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Create database connection
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Check if admin exists (only return existence, no other data)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        // Admin exists
        echo json_encode([
            'success' => true,
            'exists' => true,
            'message' => 'Admin email found'
        ]);
    } else {
        // Admin doesn't exist
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'exists' => false,
            'error' => 'No admin account found with this email address'
        ]);
    }
    
} catch (PDOException $e) {
    error_log("Database error in check-admin.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("General error in check-admin.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while checking admin email']);
}
?>
