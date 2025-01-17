import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await adminLogin(formData.username, formData.password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-12 w-12 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-200"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}