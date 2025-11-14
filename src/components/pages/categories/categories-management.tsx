'use client';

import { useGetAllCategoriesQuery } from '@/redux/api/categories/categories-api';
import { TCategory } from '@/types';

import React, { useState } from 'react';
import RecursiveCategories from './RecursiveCategories';
import { Search, Download, Settings2, ChevronDown, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { GlobalDrawer } from '@/components/global/global-drawer';
import AddCategoriesForm from './add-categories-form';

const CategoriesManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetAllCategoriesQuery();
  const categories = data?.data || [];

  const [searchText, setSearchText] = React.useState('');

  const filteredCategories = categories.filter((cat: TCategory) =>
    cat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const exportToCSV = () => {
    const csvRows = [];

    csvRows.push(
      '_id,name,slug,isFeatured,parent_id,image,description,createdAt,updatedAt,',
    );

    categories.forEach((cat: TCategory) => {
      csvRows.push(
        `${cat._id},${cat.name},${cat.slug},${cat.isFeatured ? 'Yes' : 'No'},${cat.parent_id},${cat.image},${cat.description},${cat.createdAt},${cat.updatedAt}`,
      );
    });

    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'categories.csv';
    link.click();
  };

  return (
    <div className="p-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Category Management
        </h1>
        <p className="text-muted-foreground">
          Manage and organize categories effortlessly with nested structures,
          search, filtering, editing, and more.
        </p>
      </div>

      {/* Search + Export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <GlobalDrawer
            key={'add product'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            drawerTrigger={
              <Button variant={'outline'} type="button">
                <Plus />
                Add category
              </Button>
            }
          >
            <AddCategoriesForm
              onClose={setIsOpen}
              allCategories={categories || []}
            />
          </GlobalDrawer>
          ,
        </div>
      </div>

      {/* Recursive Categories */}
      <RecursiveCategories categories={filteredCategories} />
    </div>
  );
};

export default CategoriesManagement;
