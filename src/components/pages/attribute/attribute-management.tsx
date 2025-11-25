'use client';

import { GlobalDrawer } from '@/components/global/global-drawer';
import { Button } from '@/components/ui/button';
import { Ellipsis, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import AddAttributeForm from './add-attribute-form';
import { GlobalTable } from '@/components/global/global-table';
import {
  useDeleteAttributeMutation,
  useGetAllAttributeQuery,
} from '@/redux/api/attribute/attribute-api';
import { ColumnDef } from '@tanstack/react-table';
import { TAttribute } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import GlobalDropDown from '@/components/global/global-drop-down';
import Link from 'next/link';
import { toast } from 'sonner';

const AttributeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [deleteAttribute] = useDeleteAttributeMutation();

  // FIX → store id + drawer state together
  const [editState, setEditState] = useState<{
    isOpen: boolean;
    id: null | string;
  }>({ isOpen: false, id: null });

  const { data } = useGetAllAttributeQuery();

  const attribute = data?.data || [];

  const onDelete = async (id: string) => {
    const res = await deleteAttribute({ id });

    if (res.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  };
  const columns: ColumnDef<TAttribute>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const time = format(row.original.createdAt, 'dd-MM-yyyy hh:mm:ss a');
        return <p>{time}</p>;
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: ({ row }) => {
        const time = format(row.original.updatedAt, 'dd-MM-yyyy hh:mm:ss a');
        return <p>{time}</p>;
      },
    },
    {
      accessorKey: 'options',
      header: 'Options',
      cell: ({ row }) => (
        <div className="flex max-w-md flex-wrap gap-2">
          {row.original.options.map((item) => (
            <Badge key={item.id}>{item.value}</Badge>
          ))}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const id = row.original._id;

        return (
          <div className="flex items-center justify-center gap-2 px-2">
            {/* EDIT DRAWER */}
            <GlobalDrawer
              key={id}
              isOpen={editState.isOpen && editState.id === id}
              setIsOpen={(open) =>
                setEditState({ isOpen: open, id: open ? id : null })
              }
              drawerTrigger={
                <Button
                  variant="outline"
                  type="button"
                  size="icon"
                  onClick={() => setEditState({ isOpen: true, id })}
                >
                  <Pencil />
                </Button>
              }
            >
              <AddAttributeForm
                id={id}
                initialData={row.original}
                onClose={() => setEditState({ isOpen: false, id: null })}
              />
            </GlobalDrawer>

            {/* DROPDOWN */}
            <GlobalDropDown
              dropdownMenuLabel="Actions"
              dropdownMenuTrigger={
                <span className="text-center">
                  <Ellipsis className="size-4" />
                </span>
              }
              dropdownMenuItems={[
                <Link
                  href="#"
                  key="view-more"
                  className="w-full items-center justify-center text-center"
                >
                  View more
                </Link>,

                <Button
                  variant="outline"
                  type="button"
                  key="delete"
                  className="hover:bg-destructive/30 w-full"
                  onClick={() => onDelete(row.original._id)}
                >
                  <Trash2 />
                  Delete
                </Button>,
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-4xl font-semibold">Attribute Management</h1>
        <p className="text-muted-foreground">
          Create attributes with customizable options like size, stain level,
          fabric type, etc.
        </p>
      </div>

      <GlobalTable
        columns={columns}
        data={attribute}
        buttons={[
          <GlobalDrawer
            key="add-attribute"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            drawerTrigger={
              <Button variant="outline" type="button">
                <Plus />
                Add Attribute
              </Button>
            }
          >
            <AddAttributeForm onClose={setIsOpen} />
          </GlobalDrawer>,
        ]}
        enableExport
        enableSorting
        searchKey="name"
        searchPlaceholder="Search your attribute"
      />
    </div>
  );
};

export default AttributeManagement;
