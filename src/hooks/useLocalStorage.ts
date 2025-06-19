import { useState, useEffect } from 'react';
import { Password } from '../types/Password';
import { useAuth } from './useAuth';

const STORAGE_KEY = 'password-manager-data';

export function useLocalStorage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const { user } = useAuth();

  // Create user-specific storage key
  const getUserStorageKey = () => {
    return user ? `${STORAGE_KEY}-${user.id}` : STORAGE_KEY;
  };

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(getUserStorageKey());
      if (stored) {
        try {
          setPasswords(JSON.parse(stored));
        } catch (error) {
          console.error('Error loading passwords:', error);
          setPasswords([]);
        }
      } else {
        setPasswords([]);
      }
    }
  }, [user]);

  const savePasswords = (newPasswords: Password[]) => {
    if (user) {
      setPasswords(newPasswords);
      localStorage.setItem(getUserStorageKey(), JSON.stringify(newPasswords));
    }
  };

  const addPassword = (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPassword: Password = {
      ...passwordData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPasswords = [...passwords, newPassword];
    savePasswords(updatedPasswords);
    return newPassword;
  };

  const updatePassword = (id: string, passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedPasswords = passwords.map(p => 
      p.id === id 
        ? { ...p, ...passwordData, updatedAt: new Date().toISOString() }
        : p
    );
    savePasswords(updatedPasswords);
  };

  const deletePassword = (id: string) => {
    const updatedPasswords = passwords.filter(p => p.id !== id);
    savePasswords(updatedPasswords);
  };

  const getPassword = (id: string) => {
    return passwords.find(p => p.id === id);
  };

  return {
    passwords,
    addPassword,
    updatePassword,
    deletePassword,
    getPassword,
  };
}