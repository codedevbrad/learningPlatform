
// subscribe users and access for modal access change.

// how do i write a subscription service where updating x state will always sync wiyh y state. so x changes and
// y now knows it must do the same.

// AdminContext.tsx

'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import useSWR from 'swr';
import { action__getStudents } from './action';

// Define the context types
interface AdminContextType {
  studentsData: any;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

// Define the props for AdminProvider
interface AdminProviderProps {
  children: ReactNode;
}

// Create the Context with a default value
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

// Fetch function for students
const fetchStudents = async () => {
  try {
    const students = await action__getStudents();
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Create the provider component
export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  // SWR hook for students data
  const { data: studentsData, error, mutate: refreshData } = useSWR('students', fetchStudents);

  // Loading state for students
  const isLoading = !studentsData && !error;

  return (
    <AdminContext.Provider value={{ studentsData, isLoading, refreshData }}>
      {children}
    </AdminContext.Provider>
  );
};
