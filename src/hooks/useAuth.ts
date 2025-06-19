import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState } from '../types/User';

const AUTH_STORAGE_KEY = 'password-manager-auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider(): AuthContextType {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const { user } = JSON.parse(stored);
        setAuthState({ user, isAuthenticated: true });
      } catch (error) {
        console.error('Error loading auth state:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    
    const users = JSON.parse(localStorage.getItem('password-manager-users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const authUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      };
      
      setAuthState({ user: authUser, isAuthenticated: true });
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: authUser }));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('password-manager-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('password-manager-users', JSON.stringify(users));
    
    // Auto-login after registration
    const authUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    };
    
    setAuthState({ user: authUser, isAuthenticated: true });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: authUser }));
    
    return true;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
}

export { AuthContext };