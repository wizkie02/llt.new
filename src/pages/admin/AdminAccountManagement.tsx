import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import {
  Users,
  UserPlus,
  Trash2,
  Key,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Crown
} from 'lucide-react';

interface Admin {
  id: string | number;
  username: string;
  email: string;
  role: 'editor' | 'superadmin';
  created_at?: string;
}

const AdminAccountManagement: React.FC = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // Create Admin Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'editor' | 'superadmin'>('editor');
  const [createLoading, setCreateLoading] = useState(false);

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);// Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);
  // Filter admins based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAdmins(admins);
    } else {
      const filtered = admins.filter(admin =>
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAdmins(filtered);
    }
  }, [admins, searchQuery]);
  // Fetch admins list from API
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://leolovestravel.com/api/list-admins.php', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('API Response:', data); // Debug log
        if (data.admins && Array.isArray(data.admins)) {
          // console.log('Admins found:', data.admins.length); // Debug log
          setAdmins(data.admins);
          setFilteredAdmins(data.admins);
        } else {
          // console.log('No admins array found in response'); // Debug log
          setError('Failed to load admin list. Please try again.');
        }
      } else {
        const errorData = await response.json();
        console.error('Response not OK:', errorData); // Debug log
        setError(errorData.error || 'Unable to load admin list');
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError('An error occurred while loading admin list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Create new admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://leolovestravel.com/api/create-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',        body: JSON.stringify({
          username: newAdminUsername,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole
        }),
      });

      const data = await response.json(); if (response.ok) {
        setSuccess(data.message || 'Admin created successfully');
        setShowCreateModal(false);
        setNewAdminUsername('');
        setNewAdminEmail('');
        setNewAdminPassword('');
        setNewAdminRole('editor');
        // Refresh admin list
        await fetchAdmins();
      } else {
        setError(data.message || 'Unable to create admin');
      }
    } catch (err) {
      setError('An error occurred while creating admin');
    } finally {
      setCreateLoading(false);
    }
  };
  // Delete admin
  const handleDeleteAdmin = async (adminId: string | number) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const response = await fetch('https://leolovestravel.com/api/delete-admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id: adminId }),
      });

      const data = await response.json(); if (response.ok) {
        setSuccess(data.message || 'Admin deleted successfully');
        await fetchAdmins(); // Refresh the list instead of manual state update
      } else {
        setError(data.message || 'Unable to delete admin');
      }
    } catch (err) {
      setError('An error occurred while deleting admin');
    }
  };
  // Update admin role
  const handleUpdateRole = async (adminId: string | number, newRole: 'editor' | 'superadmin') => {
    try {
      const response = await fetch('https://leolovestravel.com/api/grant-role.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: adminId,
          role: newRole
        }),
      });

      const data = await response.json(); if (response.ok) {
        setSuccess(data.message || 'Role updated successfully');
        await fetchAdmins(); // Refresh the list instead of manual state update
      } else {
        setError(data.message || 'Unable to update role');
      }
    } catch (err) {
      setError('An error occurred while updating role');
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Password confirmation does not match');
      return;
    }

    setPasswordLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://leolovestravel.com/api/change-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        }),
      });

      const data = await response.json(); if (response.ok) {
        setSuccess(data.message || 'Password changed successfully');
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Unable to change password');
      }
    } catch (err) {
      setError('An error occurred while changing password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const isSuperAdmin = user?.role === 'superadmin';
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Fixed header spacing */}
      <div className="pt-20 pb-8">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#0093DE' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Admin Account Management</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive admin account management with role-based permissions and secure operations
            </p>
          </div>          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="mb-6 shadow-lg">
              <XCircle className="h-5 w-5" />
              <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 text-sm font-medium">{success}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons Card */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              {isSuperAdmin && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  size="lg"
                  className="bg-gradient-to-r from-[#0093DE] to-[#007ab3] hover:from-[#007ab3] hover:to-[#005a85] text-white font-medium px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create New Admin
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowPasswordModal(true)}
                className="border-2 border-[#0093DE] text-[#0093DE] hover:bg-[#0093DE] hover:text-white font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <Key className="w-5 h-5 mr-2" />
                Change Password
              </Button>

                <Button
                variant="outline"
                size="lg"
                onClick={fetchAdmins}
                disabled={loading}
                className="border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh List
                </Button>
            </div>
            </CardContent>
          </Card>          {/* Search Bar */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />                <Input
                  type="text"
                  placeholder="Search admins by username, email or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20 bg-white"
                />
              </div>
              {searchQuery && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">
                    Found {filteredAdmins.length} admin(s) matching "{searchQuery}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>          {/* Admins List */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg border-b border-gray-200">
              <CardTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#0093DE' }}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800">Admin List ({searchQuery ? filteredAdmins.length : admins.length})</span>
                </div>
                {searchQuery && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                    Filtered Results
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#0093DE' }}></div>
                  <p className="text-gray-600 font-medium">Loading admin accounts...</p>
                </div>
              ) : (
                <>
                  {filteredAdmins.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100">
                        <Users className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searchQuery ? 'No matching admins found' : 'No admin accounts'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchQuery
                          ? `No admins match your search for "${searchQuery}"`
                          : 'There are currently no admin accounts in the system.'
                        }
                      </p>
                      {searchQuery && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery('')}
                          className="border-[#0093DE] text-[#0093DE] hover:bg-[#0093DE] hover:text-white rounded-2xl"
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Admin Info</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Created Date</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                            {isSuperAdmin && <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAdmins.map((admin) => (
                            <tr
                              key={admin.id}                              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${String(admin.id) === String(user?.id) ? 'bg-blue-50' : ''
                                }`}
                            >
                              <td className="py-4 px-6">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#0093DE' }}>
                                    <Mail className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">{admin.username}</p>
                                    <p className="text-gray-600 text-sm">{admin.email}</p>
                                  </div>
                                </div>
                              </td>                              <td className="py-4 px-6">
                                <Badge
                                  variant={admin.role === 'superadmin' ? 'destructive' : 'secondary'}
                                  className={`px-3 py-1 text-sm font-medium ${admin.role === 'superadmin'
                                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                    }`}
                                >
                                  {admin.role === 'superadmin' ? (
                                    <><Crown className="w-4 h-4 mr-1" />Super Admin</>
                                  ) : (
                                    'Editor'
                                  )}
                                </Badge>
                              </td>
                              <td className="py-4 px-6">
                                {admin.created_at ? (
                                  <span className="text-sm text-gray-600 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(admin.created_at).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-4 px-6">
                                {String(admin.id) === String(user?.id) ? (
                                  <Badge variant="outline" className="text-sm px-3 py-1 border-2 border-[#0093DE] text-[#0093DE] bg-blue-50 font-medium">
                                    Current User
                                  </Badge>
                                ) : (
                                  <span className="text-sm text-gray-500">Active</span>
                                )}
                              </td>
                              {isSuperAdmin && (
                                <td className="py-4 px-6">
                                  {String(admin.id) !== String(user?.id) ? (
                                    <div className="flex items-center justify-center space-x-2">
                                      <select
                                        value={admin.role}
                                        onChange={(e) => handleUpdateRole(admin.id, e.target.value as 'editor' | 'superadmin')}
                                        className="text-sm border-2 border-gray-200 rounded-2xl px-3 py-2 bg-white focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20 font-medium"
                                        title="Change Role"
                                      >
                                        <option value="editor">Editor</option>
                                        <option value="superadmin">Super Admin</option>
                                      </select>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteAdmin(admin.id)}
                                        title="Delete Admin"
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 rounded-2xl"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <span className="text-center text-sm text-gray-400">-</span>
                                  )}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>        {/* Create Admin Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#0093DE] to-[#007ab3] text-white rounded-t-lg">
                  <CardTitle className="flex items-center text-xl text-white">
                    <UserPlus className="w-6 h-6 mr-3" />
                    Create New Admin Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">                  <form onSubmit={handleCreateAdmin} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
                    <Input
                      type="text"
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      required
                      placeholder="Enter username"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>                      <Input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Role</label>
                    <select
                      value={newAdminRole}
                      onChange={(e) => setNewAdminRole(e.target.value as 'editor' | 'superadmin')}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20 bg-white text-gray-900"
                    >
                      <option value="editor">Editor</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>                      <Input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      required
                      placeholder="Enter secure password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">                      <Button
                    type="submit"
                    disabled={createLoading}
                    className="flex-1 bg-gradient-to-r from-[#0093DE] to-[#007ab3] hover:from-[#007ab3] hover:to-[#005a85] text-white font-medium py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {createLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Admin
                      </>
                    )}
                  </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
                </CardContent>
              </Card>
            </div>
          )}        {/* Change Password Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#0093DE] to-[#007ab3] text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl text-white">
                    <Key className="w-6 h-6 mr-3" />
                    Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Current Password</label>                      <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">New Password</label>                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Confirm New Password</label>                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-[#0093DE] focus:ring-2 focus:ring-[#0093DE]/20"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">                      <Button
                      type="submit"
                      disabled={passwordLoading}
                      className="flex-1 bg-gradient-to-r from-[#0093DE] to-[#007ab3] hover:from-[#007ab3] hover:to-[#005a85] text-white font-medium py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {passwordLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Changing...
                        </>
                      ) : (
                        <>
                          <Key className="w-4 h-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </Button>
                        <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPasswordModal(false)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:text-gray-900 focus:text-gray-900"
                        >
                        Cancel
                        </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>)}
        </div>
      </div>
    </div>
  );
};


export default AdminAccountManagement;
