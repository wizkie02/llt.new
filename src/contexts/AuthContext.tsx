import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  getAuthHeaders: () => { [key: string]: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkExistingSession = () => {
      const storedUser = localStorage.getItem('admin_user');
      const storedToken = localStorage.getItem('admin_token');
      const loginTime = localStorage.getItem('admin_login_time');
      
      if (storedUser && storedToken && loginTime) {
        const now = new Date().getTime();
        const loginTimestamp = parseInt(loginTime);
        const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        
        if (now - loginTimestamp < sessionDuration) {
          // Session is still valid
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          // Session expired, clear storage
          localStorage.removeItem('admin_user');
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_login_time');
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://leolovestravel.com/api/login-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Check if login was successful and token exists
        if (data.success && data.token) {
          // Extract user data from API response
          const userData: User = {
            id: parseInt(data.admin?.id) || 1,
            email: data.admin?.email || username,
            role: (data.admin?.role as 'admin' | 'superadmin') || 'admin',
            created_at: data.admin?.created_at || new Date().toISOString()
          };
          
          // Store user data and token
          setUser(userData);
          setToken(data.token);
          
          // Save to localStorage
          localStorage.setItem('admin_user', JSON.stringify(userData));
          localStorage.setItem('admin_token', data.token);
          localStorage.setItem('admin_login_time', new Date().getTime().toString());
          
          console.log('Login successful with token:', data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('https://leolovestravel.com/api/logout-admin.php', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_login_time');
    }
  };

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading,
    getAuthHeaders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};