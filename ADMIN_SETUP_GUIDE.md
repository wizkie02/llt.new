# Admin System Quick Setup Guide

## Prerequisites
1. **Backend Server**: The PHP APIs should be deployed at `https://leolovestravel.com/api/`
2. **Database**: MySQL/MariaDB with the `admins` table created
3. **Initial Admin**: At least one superadmin account in the database

## Database Setup

### 1. Create Admins Table
```sql
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'superadmin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Create Initial Super Admin
```sql
-- Password is 'admin123' (hashed with bcrypt)
INSERT INTO admins (email, password, role) VALUES 
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin');
```

## Quick Test

### 1. Start Development Server
```bash
cd llt.new
npm run dev
```

### 2. Test Login
1. Navigate to `http://localhost:5173/admin/login`
2. Enter credentials:
   - **Email/Username**: `admin@example.com`
   - **Password**: `admin123`
3. Click "Login"

### 3. Test Admin Management
1. After login, go to `http://localhost:5173/admin/account-management`
2. Try creating a new admin account
3. Test role changes and password management

### 4. Run System Tests
1. Navigate to `http://localhost:5173/admin/system-test`
2. Enter your admin credentials
3. Click "Run Full Test Suite"
4. Verify all tests pass

## Common Issues & Solutions

### CORS Errors
If you get CORS errors, check that `api/config.php` has:
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
```

### Database Connection
Verify `api/config.php` database settings:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'llt_travel');
```

### Session Issues
Ensure PHP sessions are enabled and configured properly on your server.

## API Endpoints Status

✅ All endpoints implemented and ready:
- `/api/login-admin.php` - Authentication
- `/api/logout-admin.php` - Logout
- `/api/list-admins.php` - List all admins
- `/api/create-admin.php` - Create new admin
- `/api/delete-admin.php` - Delete admin
- `/api/grant-role.php` - Change admin role
- `/api/change-password.php` - Change password
- `/api/reset-password.php` - Reset password

## Production Deployment

### 1. Update CORS Settings
In `api/config.php`, change:
```php
header('Access-Control-Allow-Origin: https://your-production-domain.com');
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Deploy Files
- Upload `dist/` folder to your web server
- Upload `api/` folder to your server
- Ensure PHP and MySQL are properly configured

### 4. Test Production
Run the system test on your production environment to ensure everything works.

---

🎉 **Your Admin Account Management System is now ready!**
