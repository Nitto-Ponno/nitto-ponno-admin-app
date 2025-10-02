import {
  Sidebar,
  SidebarContent,
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

// Menu item type
export type SidebarType = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SidebarType[];
};

// Sidebar data (based on screenshot)

// Recursive Renderer
function SidebarItem({ item }: { item: SidebarType }) {
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
                  <SidebarMenuItem key={child.title} className="ml-2">
                    <SidebarMenuButton asChild className="">
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
      <SidebarMenuButton asChild className="!text-sidebar-accent-foreground">
        <Link href={item.url || '#'}>
          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
          {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
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
    </Sidebar>
  );
}
