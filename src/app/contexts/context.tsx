'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { action__checkRole } from './actions';

// Define the context types
interface UserContextType {
  isAdminRole: boolean;
  setRole: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// Create a Context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAdminRole, setRole] = useState<boolean>(false);

  useEffect(() => {
    // FETCH USER ROLE OF LOGGED IN USER...
    console.log('fetching user')
    action__checkRole()
      .then((adminCheck) => {
        setRole(adminCheck);
      })
      .catch((err) => {
        console.error('Error fetching user based on logged user:');
      });
  }, []);

  return (
    <UserContext.Provider value={{ isAdminRole, setRole }}>
      {children}
    </UserContext.Provider>
  );
};