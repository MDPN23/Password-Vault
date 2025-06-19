import React, { useState } from 'react';
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

  const handleViewChange = (view: 'list' | 'add') => {
    setCurrentView(view);
    if (view === 'list') {
      setEditingPassword(undefined);
    }
  };

  const handleEdit = (password: Password) => {
    setEditingPassword(password);
    setCurrentView('edit');
  };

  const handleSavePassword = (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPassword) {
      updatePassword(editingPassword.id, passwordData);
    } else {
      addPassword(passwordData);
    }
    setCurrentView('list');
    setEditingPassword(undefined);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingPassword(undefined);
  };

  const handleDelete = (id: string) => {
    deletePassword(id);
  };

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
            passwords={passwords}
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