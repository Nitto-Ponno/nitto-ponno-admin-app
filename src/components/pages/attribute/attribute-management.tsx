'use client';

import { GlobalDrawer } from '@/components/global/global-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import AddAttributeForm from './add-attribute-form';

const AttributeManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const exportToCSV = () => {
    console.log('TODO: export attribute list');
  };

  return (
    <div className="p-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Attribute Management
        </h1>
        <p className="text-muted-foreground">
          Create attributes with customizable options like size, stain level,
          fabric type, etc.
        </p>
      </div>

      {/* Search + Export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search attributes..."
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
          </GlobalDrawer>
        </div>
      </div>
    </div>
  );
};

export default AttributeManagement;
