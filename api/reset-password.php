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
    
    if (!$input || !isset($input['email']) || !isset($input['new_password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and new password are required']);
        exit();
    }
    
    $email = trim($input['email']);
    $new_password = trim($input['new_password']);
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Validate password length
    if (strlen($new_password) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 6 characters long']);
        exit();
    }
    
    // Create database connection
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    
    // Check if admin exists
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        http_response_code(404);
        echo json_encode(['error' => 'No admin account found with this email address']);
        exit();
    }
    
    // Hash the new password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    
    // Update the password
    $stmt = $pdo->prepare("UPDATE admins SET password = ?, updated_at = NOW() WHERE email = ?");
    $success = $stmt->execute([$hashed_password, $email]);
    
    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => 'Password reset successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to reset password']);
    }
    
} catch (PDOException $e) {
    error_log("Database error in reset-password.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("General error in reset-password.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while resetting password']);
}
?>