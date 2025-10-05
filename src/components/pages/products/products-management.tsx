'use client';
import { GlobalTable } from '@/components/global/global-table';

import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import React, { memo } from 'react';
import products from '@/components/pages/products/products.json';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import GlobalDropDown from '@/components/global/global-drop-down';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title.en' as keyof Product,
    header: 'Name',
    id: 'title',
  },
  {
    accessorKey: 'tag',
    header: 'Tags',
    cell: ({ row }) => {
      return row.original.tag?.map((item, i) => {
        return (
          <Badge key={i} className="ml-2">
            {item}
          </Badge>
        );
      });
    },
    id: 'tag',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category?.name?.en || '—',
    id: 'category',
  },
  {
    accessorKey: 'prices.price' as keyof Product,
    header: 'Price',
    cell: ({ row }) => `$${row.original.prices.price.toFixed(2)}`,
    id: 'price',
  },
  {
    accessorKey: 'prices.discount' as keyof Product,
    header: 'Discount (%)',
    cell: ({ row }) => `${row.original.prices.discount}%`,
    id: 'prices.discount',
  },
  {
    accessorKey: 'rating' as keyof Product,
    header: 'Rating ⭐',
    // assuming rating is derived or missing — show N/A for now
    cell: ({ row }) => (row.original.sales ? `${row.original.sales}` : '—'),
    id: 'rating',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => row.original.stock.toLocaleString(),
    id: 'stock',
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status === 'show'
            ? 'bg-green-100 text-green-600'
            : 'bg-gray-100 text-gray-500'
        } rounded-md px-2 py-1 text-sm font-medium`}
      >
        {row.original.status}
      </span>
    ),
    id: 'status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Added',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('en-GB'),
    id: 'createdAt',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString('en-GB'),
    id: 'updatedAt',
  },
  {
    id: 'actions',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <GlobalDropDown
          dropdownMenuLabel="Action"
          dropdownMenuTrigger={
            <span className="w-full text-center">
              <Ellipsis className="text-sidebar-accent-foreground size-4" />
            </span>
          }
          dropdownMenuItems={[
            <Link
              href={`/products/${product.slug}`}
              key={'any'}
              className="w-full"
            >
              View more
            </Link>,
          ]}
        />
      );
    },
  },
];

const ProductsManagement = () => {
  return (
    <div className="px-6">
      <div className="">
        <div className="mb-6 space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Product Management
          </h1>
          <p className="text-muted-foreground">
            A reusable data table with search, filtering, sorting, column
            settings, export, and pagination.
          </p>
        </div>

        <GlobalTable
          columns={columns}
          data={products as Product[]}
          searchKey="title"
          searchPlaceholder="Search by ..."
          enableExport
        />
      </div>
    </div>
  );
};

export default memo(ProductsManagement);
