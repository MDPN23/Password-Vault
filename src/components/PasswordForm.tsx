import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, RefreshCw, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { PasswordFormProps } from '../types/Password';
import { generatePassword, getPasswordStrength } from '../utils/passwordUtils';
import { useAuth } from '../hooks/useAuth'; // adjust path as needed

export function PasswordForm({ password, onSave, onCancel }: PasswordFormProps) {
  const { user, masterPassword } = useAuth();
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (password) {
      setFormData({
        website: password.website,
        username: password.username,
        password: password.password, 
      });
    }
  }, [password]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.website.trim()) newErrors.website = 'Website name is required';
    if (!formData.username.trim()) newErrors.username = 'Username or email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 4)
      newErrors.password = 'Password must be at least 4 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user || !user.email || !masterPassword) {
      alert('User not authenticated or master password missing. Cannot encrypt password.');
      return;
    }

    try {
      onSave({
        id: password?.id ?? crypto.randomUUID(),
        website: formData.website,
        username: formData.username,
        password: formData.password, // ✅ Save plain password, encryption happens later
        createdAt: password?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Failed to encrypt the password before saving.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(16);
    handleInputChange('password', newPassword);
    setShowPassword(true);
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {password ? 'Edit Password' : 'Add New Password'}
            </h2>
            <p className="text-gray-600 mt-1">
              {password ? 'Update your password information' : 'Save a new password securely'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Cancel"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Website Name *
            </label>
            <input
              type="text"
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="e.g., Google, Facebook, GitHub"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.website ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.website && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errors.website}</span>
              </div>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username or Email *
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="e.g., john@example.com or johnsmith"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.username && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errors.username}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter a strong password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{errors.password}</span>
              </div>
            )}
            {passwordStrength && formData.password && !errors.password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Password Strength:</span>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score < 3
                        ? 'bg-red-500'
                        : passwordStrength.score < 5
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI-powered strength analysis will be integrated here using IBM Granite or similar technology
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{password ? 'Update Password' : 'Save Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
