import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  RefreshCw,
  Database,
  Shield,
  Users,
  Key,
  Loader2,
  FileText,
  Globe,
  Lock
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  details?: any;
  duration?: number;
}

interface ApiEndpoint {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  requiresAuth: boolean;
  category: 'auth' | 'admin' | 'password' | 'system';
}

const AdminSystemTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testConfig, setTestConfig] = useState({
    email: 'admin@example.com',
    password: 'admin123',
    baseUrl: 'https://leolovestravel.com/api'
  });

  // Define API endpoints to test
  const apiEndpoints: ApiEndpoint[] = [
    { name: 'Login Admin', url: 'login-admin.php', method: 'POST', requiresAuth: false, category: 'auth' },
    { name: 'Logout Admin', url: 'logout-admin.php', method: 'POST', requiresAuth: true, category: 'auth' },
    { name: 'List Admins', url: 'list-admins.php', method: 'GET', requiresAuth: true, category: 'admin' },
    { name: 'Create Admin', url: 'create-admin.php', method: 'POST', requiresAuth: true, category: 'admin' },
    { name: 'Delete Admin', url: 'delete-admin.php', method: 'POST', requiresAuth: true, category: 'admin' },
    { name: 'Grant Role', url: 'grant-role.php', method: 'POST', requiresAuth: true, category: 'admin' },
    { name: 'Change Password', url: 'change-password.php', method: 'POST', requiresAuth: true, category: 'password' },
    { name: 'Reset Password', url: 'reset-password.php', method: 'POST', requiresAuth: true, category: 'password' }
  ];

  // Add test result
  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  // Test single API endpoint
  const testApiEndpoint = async (endpoint: ApiEndpoint): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      const url = `${testConfig.baseUrl}/${endpoint.url}`;
      let body: any = {};
        // Prepare request body based on endpoint
      if (endpoint.name === 'Login Admin') {
        body = { username: testConfig.email, password: testConfig.password };
      } else if (endpoint.name === 'Create Admin') {
        body = { email: 'test@example.com', password: 'test123' };
      } else if (endpoint.name === 'Delete Admin') {
        body = { id: 999 }; // Test with non-existent ID
      } else if (endpoint.name === 'Grant Role') {
        body = { id: 1, role: 'admin' };
      } else if (endpoint.name === 'Change Password') {
        body = { old_password: 'old123', new_password: 'new123' };
      } else if (endpoint.name === 'Reset Password') {
        body = { email: 'test@example.com', new_password: 'reset123' };
      }

      const options: RequestInit = {
        method: endpoint.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (endpoint.method === 'POST') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const duration = Date.now() - startTime;
      
      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: 'Invalid JSON response' };
      }

      if (response.ok) {
        return {
          name: endpoint.name,
          status: 'success',
          message: `API endpoint accessible (${response.status})`,
          details: data,
          duration
        };
      } else {
        return {
          name: endpoint.name,
          status: 'warning',
          message: `HTTP ${response.status}: ${data.message || 'Unknown error'}`,
          details: data,
          duration
        };
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      return {
        name: endpoint.name,
        status: 'error',
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration
      };
    }
  };

  // Test authentication flow
  const testAuthFlow = async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test login
    const loginResult = await testApiEndpoint(apiEndpoints.find(e => e.name === 'Login Admin')!);
    results.push(loginResult);
    
    if (loginResult.status === 'success') {
      // Test authenticated endpoint
      const listResult = await testApiEndpoint(apiEndpoints.find(e => e.name === 'List Admins')!);
      results.push(listResult);
      
      // Test logout
      const logoutResult = await testApiEndpoint(apiEndpoints.find(e => e.name === 'Logout Admin')!);
      results.push(logoutResult);
    }
    
    return results;
  };

  // Test all endpoints
  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test basic connectivity
    addTestResult({
      name: 'System Connectivity',
      status: 'pending',
      message: 'Testing basic connectivity...'
    });

    try {
      const response = await fetch(testConfig.baseUrl.replace('/api', ''));
      if (response.ok) {
        addTestResult({
          name: 'System Connectivity',
          status: 'success',
          message: 'Server is accessible'
        });
      } else {
        addTestResult({
          name: 'System Connectivity',
          status: 'warning',
          message: `Server responded with status ${response.status}`
        });
      }
    } catch {
      addTestResult({
        name: 'System Connectivity',
        status: 'error',
        message: 'Cannot connect to server'
      });
    }

    // Test authentication flow
    addTestResult({
      name: 'Authentication Flow',
      status: 'pending',
      message: 'Testing authentication...'
    });

    const authResults = await testAuthFlow();
    authResults.forEach(result => addTestResult(result));

    // Test other endpoints
    for (const endpoint of apiEndpoints.filter(e => !['Login Admin', 'List Admins', 'Logout Admin'].includes(e.name))) {
      const result = await testApiEndpoint(endpoint);
      addTestResult(result);
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsRunning(false);
  };

  // Get status icon
  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default:
        return null;
    }
  };

  // Calculate test summary
  const testSummary = {
    total: testResults.length,
    success: testResults.filter(r => r.status === 'success').length,
    error: testResults.filter(r => r.status === 'error').length,
    warning: testResults.filter(r => r.status === 'warning').length,
    pending: testResults.filter(r => r.status === 'pending').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-blue-600" />
          Admin System Test
        </h1>
        <p className="text-gray-600">Test and diagnose admin system APIs and functionality</p>
      </div>

      {/* Test Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Test Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Admin Email</label>
              <Input
                type="email"
                value={testConfig.email}
                onChange={(e) => setTestConfig(prev => ({ ...prev, email: e.target.value }))}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                value={testConfig.password}
                onChange={(e) => setTestConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder="password"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">API Base URL</label>
              <Input
                type="url"
                value={testConfig.baseUrl}
                onChange={(e) => setTestConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
                placeholder="https://example.com/api"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setTestResults([])}
              disabled={isRunning}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Summary */}
      {testResults.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{testSummary.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{testSummary.success}</div>
                <div className="text-sm text-gray-600">Success</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{testSummary.warning}</div>
                <div className="text-sm text-gray-600">Warning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{testSummary.error}</div>
                <div className="text-sm text-gray-600">Error</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{testSummary.pending}</div>
                <div className="text-sm text-gray-600">Running</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{result.name}</h4>
                        {getStatusBadge(result.status)}
                        {result.duration && (
                          <span className="text-xs text-gray-500">({result.duration}ms)</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{result.message}</p>
                      {result.details && result.status !== 'pending' && (
                        <details className="mt-2">
                          <summary className="text-xs text-blue-600 cursor-pointer">Show Details</summary>
                          <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                            {JSON.stringify(result.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Authentication Endpoints */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Authentication
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/login-admin.php</code>
                  <p className="text-xs text-gray-600 mt-1">Admin login with username/email and password</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/logout-admin.php</code>
                  <p className="text-xs text-gray-600 mt-1">Admin logout and session cleanup</p>
                </div>
              </div>
            </div>

            {/* Admin Management Endpoints */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Admin Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <code>GET /api/list-admins.php</code>
                  <p className="text-xs text-gray-600 mt-1">List all admin accounts</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/create-admin.php</code>
                  <p className="text-xs text-gray-600 mt-1">Create new admin account</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/delete-admin.php</code>
                  <p className="text-xs text-gray-600 mt-1">Delete admin account</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/grant-role.php</code>
                  <p className="text-xs text-gray-600 mt-1">Update admin role</p>
                </div>
              </div>
            </div>

            {/* Password Management Endpoints */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Key className="w-4 h-4 mr-2" />
                Password Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/change-password.php</code>
                  <p className="text-xs text-gray-600 mt-1">Change current user password</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <code>POST /api/reset-password.php</code>
                  <p className="text-xs text-gray-600 mt-1">Reset any admin password</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Security Features
              </h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Session-based authentication with secure cookies</li>
                <li>• Role-based access control (admin/superadmin)</li>
                <li>• CORS enabled for cross-origin requests</li>
                <li>• Input validation and SQL injection prevention</li>
                <li>• Password hashing with secure algorithms</li>
                <li>• Self-deletion prevention for security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemTest;