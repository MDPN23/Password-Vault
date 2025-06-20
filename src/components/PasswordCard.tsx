import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Edit2, Trash2, Globe, User, Check } from 'lucide-react';
import { Password } from '../types/Password';
import { copyToClipboard, formatDate } from '../utils/passwordUtils';


interface PasswordCardProps {
  password: Password;
  onEdit: (password: Password) => void;
  onDelete: (id: string) => void;
}

export function PasswordCard({ password, onEdit, onDelete }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    if (await copyToClipboard(text)) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{password.website}</h3>
            <p className="text-sm text-gray-500">Created {formatDate(password.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(password)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit password"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(password.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete password"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Username</p>
              <p className="text-sm font-medium text-gray-900">{password.username}</p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(password.username, 'username')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy username"
          >
            {copiedField === 'username' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Password</p>
              <p className="text-sm font-medium text-gray-900 font-mono break-all turncate overflow-hidden">
                {showPassword ? password.password : '••••••••••••'}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(showPassword ? password.password : password.password, 'password')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy password"
          >
            {copiedField === 'password' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}