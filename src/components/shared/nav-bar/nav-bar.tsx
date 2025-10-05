import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search } from 'lucide-react';
import React from 'react';
import ThemeToggle from './theme-toggle';

const Navbar = () => {
  return (
    <div className="flex items-center py-3 shadow">
      <SidebarTrigger />
      <div className="flex w-full justify-between">
        <Input
          className="text-sidebar-foreground max-w-md"
          prefix={<Search className="stroke-sidebar-foreground size-4" />}
        />
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
