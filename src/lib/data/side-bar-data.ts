import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
  FileText,
  Users,
  ShoppingCart,
  FolderTree,
  Package,
  Tag,
  PackageOpen,
  Truck,
  Bell,
  Images,
  Rss,
  Paperclip,
} from 'lucide-react';
import { SidebarType } from '../../components/shared/side-bar/app-sidebar';

export const sidebarItems: SidebarType[] = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Profile', url: '/profile', icon: Users },
  { title: 'Laundry Service', url: '/laundry-service', icon: Tag },

  { title: 'Categories', url: '/categories', icon: FolderTree },

  {
    title: 'Attribute Management',
    icon: Paperclip,
    url: '/attribute',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    url: '/orders',
  },
  { title: 'Products', url: '/products', icon: PackageOpen },
  {
    title: 'Users',
    icon: Users,
    url: '/users',
  },
  {
    title: 'Riders',
    icon: Truck,
    url: '/riders',
  },
];
