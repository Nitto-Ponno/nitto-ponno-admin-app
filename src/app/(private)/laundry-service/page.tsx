'use client';
import PageHeader from '@/components/global/page-header';
import CreateServiceDialog from '@/components/pages/luandry-service/CreateServiceDialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Circle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  useGetAllServicesQuery,
  useUpdateLaundryServiceMutation,
} from '@/redux/api/laundryService/laundryService';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ILaundryService } from '@/types/laundryservice';

const LaundryService = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);
  const [updateService] = useUpdateLaundryServiceMutation();

  const services: ILaundryService[] = data?.data || [];

  const handleToggleActive = async (
    serviceId: string,
    currentActive: boolean,
  ) => {
    try {
      await updateService({
        id: serviceId,
        data: { isActive: !currentActive },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update service status:', error);
    }
  };

  return (
    <div className="p-2">
      <PageHeader
        title="Laundry Services"
        subtitle={`Manage your ${services.length || 0} laundry services`}
        buttons={
          <div>
            <CreateServiceDialog />
          </div>
        }
      />

      <div>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : services.length === 0 ? (
          <div className="border-border rounded-xl border border-dashed py-16 text-center">
            <p className="text-muted-foreground mb-4">No services found</p>
            <CreateServiceDialog />
          </div>
        ) : (
          <div className="bg-card overflow-hidden rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-12">Order</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="w-32 text-center">Status</TableHead>
                  <TableHead className="w-40 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow
                    key={service._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="text-muted-foreground font-medium">
                      {service.displayOrder ?? '—'}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                      {service.shortDescription && (
                        <div className="text-muted-foreground mt-0.5 text-xs">
                          {service.shortDescription}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                      {service.slug}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden text-sm lg:table-cell">
                      {service.description ? (
                        <div className="line-clamp-2 max-w-md">
                          {service.description}
                        </div>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={service.isActive ? 'default' : 'secondary'}
                        className={`min-w-[90px] justify-center ${
                          service.isActive
                            ? 'bg-green-600 text-white hover:bg-green-600'
                            : 'bg-orange-500 text-white hover:bg-orange-500'
                        }`}
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={service.isActive}
                          onCheckedChange={() =>
                            handleToggleActive(service._id!, service.isActive)
                          }
                          className="mr-2"
                        />
                        <Link href={`/laundry-services/${service.slug}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="text-destructive h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaundryService;
