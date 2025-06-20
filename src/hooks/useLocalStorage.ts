import { useState, useEffect } from 'react';
import { Password } from '../types/Password';
import { useAuth } from './useAuth';
import { encryptData, decryptData } from '../utils/crypto';

const STORAGE_KEY = 'password-manager-data';

export function useLocalStorage() {
  const [passwords, setPasswords] = useState<Password[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const { user, masterPassword } = useAuth();
  const [loading, setLoading] = useState(true);

  const getUserStorageKey = () => {
    return user ? `${STORAGE_KEY}-${user.id}` : STORAGE_KEY;
  };

  useEffect(() => {
    const loadData = async () => {
      if (user && masterPassword) {
        const stored = localStorage.getItem(getUserStorageKey());
        if (stored) {
          try {
            const decrypted = await decryptData(stored, masterPassword);
            setPasswords(JSON.parse(decrypted));
          } catch (error) {
            console.error('Decryption failed:', error);
            setPasswords([]);
          }
        } else {
          setPasswords([]);
        }
        setLoading(false);
      }
    };

    loadData();
  }, [user, masterPassword]);

  const savePasswords = async (newPasswords: Password[]) => {
    if (user && masterPassword) {
      setPasswords(newPasswords);
      const encrypted = await encryptData(JSON.stringify(newPasswords), masterPassword);
      localStorage.setItem(getUserStorageKey(), encrypted);
    }
  };

  const addPassword = async (passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPassword: Password = {
      ...passwordData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedPasswords = [...passwords, newPassword];
    await savePasswords(updatedPasswords);
    return newPassword;
  };

  const updatePassword = async (id: string, passwordData: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedPasswords = passwords.map(p => 
      p.id === id 
        ? { ...p, ...passwordData, updatedAt: new Date().toISOString() }
        : p
    );
    await savePasswords(updatedPasswords);
  };

  const deletePassword = async (id: string) => {
    const updatedPasswords = passwords.filter(p => p.id !== id);
    if (updatedPasswords.length === 0) {
      localStorage.removeItem(getUserStorageKey());
      setPasswords([]);
    } else {
      await savePasswords(updatedPasswords);
    }
  };

  const getPassword = (id: string) => {
    return passwords.find(p => p.id === id);
  };

  return {
    passwords,
    loading,
    addPassword,
    updatePassword,
    deletePassword,
    getPassword,
  };
}
