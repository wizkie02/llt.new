// Admin System Test Utilities
export interface TestResult {
  test: string;
  success: boolean;
  message: string;
  data?: any;
}

export class AdminSystemTester {
  private baseUrl = 'https://leolovestravel.com/api';
    async testLogin(email: string, password: string): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/login-admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      
      return {
        test: 'Admin Login',
        success: response.ok,
        message: response.ok ? 'Login successful' : data.error || 'Login failed',
        data: response.ok ? data : null
      };
    } catch (error) {
      return {
        test: 'Admin Login',
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async testListAdmins(): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/list-admins.php`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      
      return {
        test: 'List Admins',
        success: response.ok,
        message: response.ok ? `Found ${data.admins?.length || 0} admins` : data.error || 'Failed to list admins',
        data: response.ok ? data : null
      };
    } catch (error) {
      return {
        test: 'List Admins',
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async testCreateAdmin(email: string, password: string): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/create-admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      return {
        test: 'Create Admin',
        success: response.ok,
        message: response.ok ? 'Admin created successfully' : data.error || 'Failed to create admin',
        data: response.ok ? data : null
      };
    } catch (error) {
      return {
        test: 'Create Admin',
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async testChangePassword(oldPassword: string, newPassword: string): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/change-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });

      const data = await response.json();
      
      return {
        test: 'Change Password',
        success: response.ok,
        message: response.ok ? 'Password changed successfully' : data.error || 'Failed to change password',
        data: response.ok ? data : null
      };
    } catch (error) {
      return {
        test: 'Change Password',
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async testLogout(): Promise<TestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/logout-admin.php`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      
      return {
        test: 'Admin Logout',
        success: response.ok,
        message: response.ok ? 'Logout successful' : data.error || 'Logout failed',
        data: response.ok ? data : null
      };
    } catch (error) {
      return {
        test: 'Admin Logout',
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async runFullTest(loginEmail: string, loginPassword: string): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Test 1: Login
    console.log('Testing admin login...');
    const loginResult = await this.testLogin(loginEmail, loginPassword);
    results.push(loginResult);

    if (!loginResult.success) {
      console.log('Login failed, stopping tests');
      return results;
    }

    // Test 2: List Admins
    console.log('Testing list admins...');
    const listResult = await this.testListAdmins();
    results.push(listResult);

    // Test 3: Create Admin (if login was successful and user is superadmin)
    if (loginResult.data?.admin?.role === 'superadmin') {
      console.log('Testing create admin...');
      const testEmail = `test_${Date.now()}@example.com`;
      const createResult = await this.testCreateAdmin(testEmail, 'testpassword123');
      results.push(createResult);
    }

    // Test 4: Logout
    console.log('Testing logout...');
    const logoutResult = await this.testLogout();
    results.push(logoutResult);

    return results;
  }
}

export const adminTester = new AdminSystemTester();
