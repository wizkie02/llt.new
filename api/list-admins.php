<?php
// list-admins.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

try {
    // Validate admin session
    validateSession();
    
    $pdo = getDBConnection();
    
    // Fetch all admins (exclude password field)
    $stmt = $pdo->prepare("SELECT id, email, role, created_at FROM admins ORDER BY created_at DESC");
    $stmt->execute();
    $admins = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'admins' => $admins,
        'count' => count($admins)
    ]);
    
} catch (Exception $e) {
    error_log("List admins error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
