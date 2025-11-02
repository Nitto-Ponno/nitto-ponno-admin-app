import PageHeader from '@/components/global/page-header';
import CreateServiceDialog from '@/components/pages/luandry-service/CreateServiceDialog';
import { Button } from '@/components/ui/button';
import React from 'react';

const LaundryService = () => {
  return (
    <div className="p-2">
      <PageHeader
        title="Laundry Services"
        subtitle="Manage your laundry services"
        buttons={
          <div>
            <CreateServiceDialog />
          </div>
        }
      />
    </div>
  );
};

export default LaundryService;
