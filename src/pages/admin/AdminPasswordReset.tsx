import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Lock, Mail, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

const AdminPasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Auto-dismiss messages after 5 seconds
  React.useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Check if the email exists in the system using secure check-admin API
      const response = await fetch('https://leolovestravel.com/api/check-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email
        }),
      });

      const data = await response.json();      if (response.ok && data.success && data.exists) {
        // Email exists, now send reset request via webhook
        try {
          const webhookResponse = await fetch('https://hook.eu2.make.com/64qlzmw738b319x80p6o1ix8mz85a3ph', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email
            }),
          });          if (webhookResponse.ok) {
            setSuccess('Password reset request has been sent successfully. You will receive an email with reset instructions shortly.');
          } else {
            setError('Email verified but failed to send reset request. Please try again.');
          }        } catch (webhookError) {
          console.error('Error sending webhook:', webhookError);
          setError('Email verified but failed to send reset request. Please try again.');
        }
      } else {
        // Email doesn't exist or API error
        setError(data.error || 'No admin account found with this email address.');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      setError('An error occurred while verifying email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md shadow-xl">        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0093DE' }}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Reset Password
          </CardTitle>          <p className="text-gray-600 text-sm">
            Enter your email address to request a password reset
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Back to Login Button */}
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/login')}
              className="text-sm text-gray-600 hover:text-gray-800 p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Button>
          </div>

          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
            {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Email Step */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your admin email for password reset"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
              <Button
              type="submit"
              className="w-full hover:opacity-90"
              style={{ backgroundColor: '#0093DE' }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending Request...' : 'Request Password Reset'}
            </Button>
          </form>          {/* Info Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 font-medium mb-2">How it works:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Enter your registered admin email address</li>
              <li>• System will process your password reset request</li>
              <li>• You will receive further instructions via email</li>
              <li>• Follow the email instructions to complete the reset</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPasswordReset;
