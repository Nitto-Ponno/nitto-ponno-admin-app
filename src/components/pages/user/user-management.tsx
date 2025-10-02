'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { GlobalTable } from '@/components/global/global-table';
import { memo } from 'react';

// Sample data type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
};

// Sample data
const data: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    joinedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Developer',
    status: 'active',
    joinedDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'Designer',
    status: 'inactive',
    joinedDate: '2024-03-10',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Developer',
    status: 'active',
    joinedDate: '2024-01-05',
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'Manager',
    status: 'pending',
    joinedDate: '2024-04-12',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'Developer',
    status: 'active',
    joinedDate: '2024-02-28',
  },
  {
    id: '7',
    name: 'Grace Wilson',
    email: 'grace@example.com',
    role: 'Designer',
    status: 'active',
    joinedDate: '2024-03-15',
  },
  {
    id: '8',
    name: 'Henry Moore',
    email: 'henry@example.com',
    role: 'Developer',
    status: 'inactive',
    joinedDate: '2024-01-20',
  },
  {
    id: '9',
    name: 'Ivy Taylor',
    email: 'ivy@example.com',
    role: 'Admin',
    status: 'active',
    joinedDate: '2024-04-01',
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack@example.com',
    role: 'Developer',
    status: 'pending',
    joinedDate: '2024-04-18',
  },
  {
    id: '11',
    name: 'Kate Thomas',
    email: 'kate@example.com',
    role: 'Manager',
    status: 'active',
    joinedDate: '2024-02-10',
  },
  {
    id: '12',
    name: 'Liam Jackson',
    email: 'liam@example.com',
    role: 'Designer',
    status: 'active',
    joinedDate: '2024-03-25',
  },
];

// Column definitions
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'active'
              ? 'default'
              : status === 'inactive'
                ? 'secondary'
                : 'outline'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joinedDate',
    header: 'Joined Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('joinedDate'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const UserManagement = () => {
  return (
    <div className="px-6">
      <div className="">
        <div className="mb-6 space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-muted-foreground">
            A reusable data table with search, filtering, sorting, column
            settings, export, and pagination.
          </p>
        </div>

        <GlobalTable
          columns={columns}
          data={data}
          searchKey="name"
          searchPlaceholder="Search by name..."
          enableExport
        />
      </div>
    </div>
  );
};

export default memo(UserManagement);
