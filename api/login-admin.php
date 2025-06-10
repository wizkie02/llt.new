<?php
// login-admin.php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Method not allowed'], 405);
}

try {
    $input = getJsonInput();
      // Validate required fields
    if (!isset($input['username']) || !isset($input['password'])) {
        sendResponse(['error' => 'Username and password are required'], 400);
    }
    
    $username = trim($input['username']);
    $password = $input['password'];
    
    if (empty($username) || empty($password)) {
        sendResponse(['error' => 'Username and password cannot be empty'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Find admin by email or username (we'll check email field for both)
    $stmt = $pdo->prepare("SELECT id, email, password, role, created_at FROM admins WHERE email = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        sendResponse(['error' => 'Email/Username không tồn tại'], 404);
    }
    
    // Verify password
    if (!password_verify($password, $admin['password'])) {
        sendResponse(['error' => 'Mật khẩu không chính xác'], 401);
    }
      // Create session
    session_regenerate_id(true);
    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_email'] = $admin['email'];
    $_SESSION['admin_role'] = $admin['role'];
    $_SESSION['login_time'] = date('Y-m-d H:i:s');
    
    // Generate JWT token
    $jwtPayload = [
        'admin_id' => $admin['id'],
        'admin_email' => $admin['email'],
        'admin_role' => $admin['role'],
        'iat' => time(),
        'exp' => time() + (8 * 60 * 60) // 8 hours expiration
    ];
    $token = generateJWT($jwtPayload);
    
    sendResponse([
        'success' => true,
        'message' => 'Đăng nhập thành công.',
        'token' => $token,
        'admin' => [
            'id' => $admin['id'],
            'email' => $admin['email'],
            'role' => $admin['role'],
            'created_at' => $admin['created_at']
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
?>
