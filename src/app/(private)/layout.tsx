import Navbar from '@/components/shared/nav-bar/nav-bar';
import AppSidebar from '@/components/shared/side-bar/app-sidebar';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AuthProvider from '@/providers/AuthProvider';
import { Search } from 'lucide-react';
import React from 'react';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full overflow-y-hidden">
          {' '}
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default PrivateLayout;
