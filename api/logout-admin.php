<?php
// logout-admin.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

try {
    validateSession();
    
    // Destroy session
    session_destroy();
    
    // Clear session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    sendResponse(['message' => 'Đăng xuất thành công.']);
    
} catch (Exception $e) {
    error_log("Logout error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
