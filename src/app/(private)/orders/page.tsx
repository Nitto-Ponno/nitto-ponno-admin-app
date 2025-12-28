'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Search } from 'lucide-react';
import { useGetOrdersQuery } from '@/redux/api/order/orderApi';
import {
  IOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '@/types/order.types';
import PageHeader from '@/components/global/page-header';
import useDebounce from '@/hooks/useDebounce';

// Helper to format dates nicely
const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Status badge colors
const getStatusBadgeVariant = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
    case 'PAYMENT_FAILED':
      return 'secondary';
    case 'CONFIRMED':
    case 'PICKUP_ASSIGNED':
    case 'PICKED_UP':
    case 'REACHED_LAUNDRY':
    case 'IN_PROCESS':
      return 'default';
    case 'READY_FOR_DELIVERY':
    case 'DELIVERY_ASSIGNED':
    case 'OUT_FOR_DELIVERY':
      return 'outline';
    case 'DELIVERED':
    case 'COMPLETED':
      return 'default';
    case 'CANCELLED':
    case 'REFUNDED':
      return 'destructive';
    default:
      return 'secondary';
  }
};

// Payment badge colors
const getPaymentBadgeVariant = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'secondary';
    case 'PAID':
      return 'default';
    case 'FAILED':
      return 'destructive';
    case 'REFUNDED':
    case 'PARTIALLY_REFUNDED':
      return 'outline';
    default:
      return 'secondary';
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>(
    'all',
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | 'all'>(
    'all',
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const debounceSearch = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetOrdersQuery({
    page,
    limit,
    search: debounceSearch,
    status: statusFilter === 'all' ? undefined : statusFilter,
    paymentMethod: paymentMethod === 'all' ? undefined : paymentMethod,
    paymentStatus: paymentFilter === 'all' ? undefined : paymentFilter,
  });
  const orders: IOrder[] = data?.data ?? [];

  return (
    <div className="bg-background">
      {/* Header */}
      <PageHeader
        title="Orders"
        subtitle="Manage and track all your laundry orders"
      />

      {/* Orders Table */}
      <Card>
        {/* Filters Section */}
        <CardHeader className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 md:col-span-2">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by orderId, customer name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter as any}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="picked_up">Picked Up</SelectItem>
              <SelectItem value="in_process">In Process</SelectItem>
              <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment Filter */}
          <Select value={paymentMethod} onValueChange={setPaymentMethod as any}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments Method</SelectItem>
              <SelectItem value="cod">COD</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="wallet">Wallet</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter as any}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="partially_refunded">
                Partially Refunded
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground p-8 text-center">
              Loading orders...
            </div>
          ) : orders?.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-lg font-medium">No orders found</p>
              <p className="text-muted-foreground mt-2 text-sm">
                {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No orders have been placed yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Items
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Payment
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow
                      key={order._id}
                      className="hover:bg-muted/50 cursor-pointer"
                    >
                      <TableCell>
                        <Link
                          href={`/orders/${order._id}`}
                          className="font-medium"
                        >
                          {order.orderId || order._id.slice(-8).toUpperCase()}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {order.user.name?.firstName || 'Guest'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.items?.length || 0} item
                        {order.items?.length !== 1 ? 's' : ''}
                      </TableCell>
                      <TableCell className="hidden font-medium md:table-cell">
                        ${order.totalAmount?.toFixed(2) || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {order.status?.replace(/_/g, ' ') || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={getPaymentBadgeVariant(order.paymentStatus)}
                        >
                          {order.paymentStatus?.replace(/_/g, ' ') || '—'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/orders/${order._id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
