import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from '../../components/admin/ChangePasswordForm';

const AdminChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin', { replace: true });
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <ChangePasswordForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        standalone={true}
      />
    </div>
  );
};

export default AdminChangePassword;
