'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { sidebarItems } from '@/lib/data/side-bar-data';
import { memo } from 'react';
import { NavUser } from './nav-user';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Menu item type
export type SidebarType = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SidebarType[];
};

// Recursive Renderer
function SidebarItem({ item }: { item: SidebarType }) {
  const path = usePathname();

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible defaultOpen={false} className="group/collapsible">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="!text-sidebar-accent-foreground flex items-center !text-sm">
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.title}
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.children.map((child) => (
                  <SidebarMenuItem key={child.title} className="ml-2 flex">
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        '!text-sidebar-accent-foreground hover:bg-accent',
                        path === child.url && '!bg-primary !text-white',
                      )}
                      isActive={path === child.url}
                    >
                      <Link href={child.url || '#'}>
                        {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                        {child.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          '!text-sidebar-accent-foreground hover:bg-accent',
          path === item.url && '!bg-primary !text-white',
        )}
        isActive={path === item.url}
      >
        <Link href={item.url || '#'}>
          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function AppSidebar() {
  const user = {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default memo(AppSidebar);
