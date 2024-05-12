'use client'
import React, { ReactNode } from 'react'
import { colors } from "../data"
import Header from "./parts/header"
import Sidebar from './parts/sidebar'

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className={`h-full flex flex-row ${ colors.app_primary_bg } p-5 `}>
          {/* left main content */}
          <div className="flex-grow p-5 mt-4 overflow-hidden pb-20">
            <Header />
            {children}
          </div>

          {/* right sidebar */}
          <Sidebar />
      </div>
    );
}