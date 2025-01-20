import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ImageUploadProps {
  onUpload: (
    file: File, 
    title: string, 
    description: string, 
    price: number, 
    size: string, 
    category: string, 
    brand: string, 
    gender: string,
    sellerDetails: {
      name: string;
      contact: string;
    }
  ) => Promise<void>;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    size: 'M',
    category: '',
    brand: '',
    gender: 'Male',
    sellerName: '',
    sellerContact: ''
  });
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      await onUpload(
        file, 
        formData.title, 
        formData.description, 
        parseFloat(formData.price), 
        formData.size,
        formData.category,
        formData.brand,
        formData.gender,
        {
          name: formData.sellerName,
          contact: formData.sellerContact
        }
      );
      setFile(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        size: 'M',
        category: '',
        brand: '',
        gender: 'Male',
        sellerName: '',
        sellerContact: ''
      });
      setError('');
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex items-center space-x-4 mb-6">
        <Upload className="h-8 w-8 text-purple-600" />
        <h2 className="text-2xl font-bold">Upload Clothing Item</h2>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-purple-500/10 border border-purple-500 p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Seller Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={formData.sellerName}
                onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-300'
                } border focus:border-purple-500 focus:ring-purple-500`}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <input
                type="tel"
                value={formData.sellerContact}
                onChange={(e) => setFormData({ ...formData, sellerContact: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-300'
                } border focus:border-purple-500 focus:ring-purple-500`}
                required
                placeholder="Enter your contact number"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:border-purple-500 focus:ring-purple-500`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:border-purple-500 focus:ring-purple-500`}
            required
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price (₹)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:border-purple-500 focus:ring-purple-500`}
            required
            min="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              } border focus:border-purple-500 focus:ring-purple-500`}
              required
            >
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              } border focus:border-purple-500 focus:ring-purple-500`}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:border-purple-500 focus:ring-purple-500`}
            required
            placeholder="e.g., T-Shirt, Jeans, Dress"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            } border focus:border-purple-500 focus:ring-purple-500`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition duration-200"
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
}