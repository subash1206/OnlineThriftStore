import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { hashPassword } from '../utils/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedPassword = await hashPassword(formData.password);
    // Add signup logic here
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-12 w-12 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
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
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-purple-500"
              required
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}