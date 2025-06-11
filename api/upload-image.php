<?php
// upload-image.php - Image upload API endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['error' => 'Only POST method allowed'], 405);
}

try {
    // Check if user is authenticated
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
        sendResponse(['error' => 'Authentication required'], 401);
    }

    $token = substr($authHeader, 7);
    
    // Verify JWT token (simplified - you should use proper JWT verification)
    // For now, just check if token exists and is not empty
    if (empty($token)) {
        sendResponse(['error' => 'Invalid token'], 401);
    }

    // Check if image file was uploaded
    if (!isset($_FILES['image'])) {
        sendResponse(['error' => 'No image file uploaded'], 400);
    }

    $uploadedFile = $_FILES['image'];
    
    // Check for upload errors
    if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'File size exceeds server limit',
            UPLOAD_ERR_FORM_SIZE => 'File size exceeds form limit',
            UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
            UPLOAD_ERR_EXTENSION => 'File upload stopped by extension'
        ];
        
        $errorMsg = $errorMessages[$uploadedFile['error']] ?? 'Unknown upload error';
        sendResponse(['error' => $errorMsg], 400);
    }

    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($uploadedFile['tmp_name']);
    
    if (!in_array($fileType, $allowedTypes)) {
        sendResponse(['error' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed'], 400);
    }

    // Validate file size (max 5MB)
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($uploadedFile['size'] > $maxSize) {
        sendResponse(['error' => 'File size must be less than 5MB'], 400);
    }

    // Create uploads directory if it doesn't exist
    $uploadDir = __DIR__ . '/../public/uploads/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            sendResponse(['error' => 'Failed to create upload directory'], 500);
        }
    }

    // Generate unique filename
    $fileExtension = pathinfo($uploadedFile['name'], PATHINFO_EXTENSION);
    $fileName = 'tour_' . time() . '_' . uniqid() . '.' . strtolower($fileExtension);
    $filePath = $uploadDir . $fileName;

    // Move uploaded file
    if (!move_uploaded_file($uploadedFile['tmp_name'], $filePath)) {
        sendResponse(['error' => 'Failed to save uploaded file'], 500);
    }

    // Generate the public URL
    $baseUrl = 'https://leolovestravel.com';
    $imageUrl = $baseUrl . '/public/uploads/' . $fileName;

    // Log successful upload
    error_log("Image uploaded successfully: " . $imageUrl);

    // Return success response
    sendResponse([
        'success' => true,
        'url' => $imageUrl,
        'filename' => $fileName,
        'size' => $uploadedFile['size'],
        'type' => $fileType
    ]);

} catch (Exception $e) {
    error_log("Image upload error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error: ' . $e->getMessage()], 500);
}
?>
