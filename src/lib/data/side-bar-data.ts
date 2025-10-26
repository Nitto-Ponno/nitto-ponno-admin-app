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
} from 'lucide-react';
import { SidebarType } from '../../components/shared/side-bar/app-sidebar';

export const sidebarItems: SidebarType[] = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Profile', url: '/profile', icon: Users },
  { title: 'App Settings', url: '/app-settings', icon: Settings },
  { title: 'Bulk Push Notifications', url: '/push', icon: Inbox },
  { title: 'Pickup Settings', url: '/pickup', icon: Calendar },
  { title: 'Coupon Settings', url: '/coupon', icon: Tag },

  {
    title: 'Reports',
    icon: FileText,
    children: [
      { title: 'Users Report', url: '/reports/users', icon: Users },
      { title: 'Orders Report', url: '/reports/orders', icon: ShoppingCart },
    ],
  },
  {
    title: 'Categories Management',
    icon: FolderTree,
    children: [
      { title: 'Categories', url: '/categories', icon: FolderTree },
      { title: 'Collections', url: '/collections', icon: Package },
      { title: 'Sub Collections', url: '/sub-collections', icon: Package },
      { title: 'Brands', url: '/brands', icon: Tag },
    ],
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    url: '/orders',
  },
  {
    title: 'Products Management',
    icon: PackageOpen,
    children: [
      { title: 'Products', url: '/products', icon: PackageOpen },
      { title: 'Flash Sales', url: '/flash-sales', icon: Tag },
      { title: 'Hot Deals', url: '/hot-deals', icon: Tag },
      { title: 'Returned Products', url: '/returned-products', icon: Package },
    ],
  },
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
  {
    title: 'Feeds',
    icon: Rss,
    children: [
      { title: 'Feeds', url: '/feeds', icon: Rss },
      { title: 'Banners', url: '/banners', icon: Images },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    url: '/notifications',
  },
];
