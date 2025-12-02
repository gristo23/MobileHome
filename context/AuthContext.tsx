// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Määra konteksti tüüp
interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (name: string) => void;
  logout: () => void;
}

// Loo kontekst
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Loo konteksti pakkuja (Provider) komponent
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Loo custom hook, et hõlpsasti konteksti kasutada
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};