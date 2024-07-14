'use client'
import React, { ReactNode } from 'react'
import Header from  './parts/header'

interface DashboardLayoutProps {
  children: ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <>
          <Header />
          { children }
      </>
    );
}