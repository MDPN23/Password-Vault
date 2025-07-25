import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { PasswordList } from './PasswordList';
import { PasswordForm } from './PasswordForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import { Password } from '../types/Password';

type View = 'list' | 'add' | 'edit';

export function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingPassword, setEditingPassword] = useState<Password | undefined>();

  const { passwords, addPassword, updatePassword, deletePassword } = useLocalStorage();
  const { user } = useAuth();

  // Optional: Debug logging
  useEffect(() => {
    console.log('User:', user);
    console.log('Loaded Passwords:', passwords);
  }, [user, passwords]);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view === 'list') {
      setEditingPassword(undefined);
    }
  };

  const handleEdit = (password: Password) => {
    setEditingPassword(password);
    setCurrentView('edit');
  };

  const handleSavePassword = async (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPassword) {
      updatePassword(editingPassword.id, passwordData);
    } else {
      addPassword(passwordData);
    }
    setEditingPassword(undefined);
    setCurrentView('list');
  };

  const handleCancel = () => {
    setEditingPassword(undefined);
    setCurrentView('list');
  };

  const handleDelete = (id: string) => {
    deletePassword(id);
  };

  // 🔒 Prevent rendering before auth is ready
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading user...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={handleViewChange}
        user={user}
      />

      <main>
        {currentView === 'list' && (
          <PasswordList
            passwords={passwords || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {(currentView === 'add' || currentView === 'edit') && (
          <PasswordForm
            password={editingPassword}
            onSave={handleSavePassword}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}
