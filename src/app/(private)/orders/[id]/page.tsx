'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Clock,
  ChevronLeft,
  Package,
  Truck,
  CheckCircle2,
} from 'lucide-react';

// Mock data - replace with API call
const mockOrderDetail = {
  _id: '1',
  orderId: 'LAUNDRY-2025-00001',
  totalAmount: 450,
  status: 'COMPLETED',
  paymentStatus: 'PAID',
  paymentMethod: 'CARD',
  subtotal: 400,
  deliveryCharge: 50,
  tax: 0,
  items: [
    {
      productName: 'Shirt Wash',
      quantity: 3,
      unitPrice: 120,
      subtotal: 360,
    },
    {
      productName: 'Pants Wash',
      quantity: 2,
      unitPrice: 20,
      subtotal: 40,
    },
  ],
  pickupAddress: {
    fullAddress: '123 Main Street, Downtown',
    apartment: 'Apt 401',
    landmark: 'Near City Mall',
  },
  deliveryAddress: {
    fullAddress: '123 Main Street, Downtown',
    apartment: 'Apt 401',
    landmark: 'Near City Mall',
    sameAsPickup: true,
  },
  preferredPickupSlot: { date: '2025-12-01', from: '10:00 AM', to: '12:00 PM' },
  preferredDeliverySlot: {
    date: '2025-12-03',
    from: '2:00 PM',
    to: '4:00 PM',
  },
  actualPickupTime: new Date('2025-12-01T10:30:00'),
  actualDeliveryTime: new Date('2025-12-03T2:30:00'),
  pickupRider: { name: 'John Rider' },
  deliveryRider: { name: 'Mike Delivery' },
  specialInstructions: 'Please handle with care',
  detergentType: 'Premium',
  perfume: true,
  foldOnly: false,
  totalWeightKg: 5.2,
  timeline: [
    { status: 'PENDING', timestamp: new Date('2025-12-01T9:00:00') },
    { status: 'IN_TRANSIT', timestamp: new Date('2025-12-01T10:30:00') },
    { status: 'COMPLETED', timestamp: new Date('2025-12-03T2:30:00') },
  ],
};

const statusColors: Record<string, string> = {
  PENDING:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  IN_TRANSIT: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  COMPLETED:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusIcons: Record<string, typeof Package> = {
  PENDING: Package,
  IN_TRANSIT: Truck,
  COMPLETED: CheckCircle2,
};

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const order = mockOrderDetail; // Replace with API call using params.id

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/orders">
              <Button variant="ghost" size="sm" className="mb-4 gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
            <h1 className="text-foreground text-3xl font-bold">
              {order.orderId}
            </h1>
            <p className="text-muted-foreground mt-2">
              Order placed on{' '}
              {new Date(order.preferredPickupSlot.date).toLocaleDateString()}
            </p>
          </div>
          <Badge className={statusColors[order.status]}>{order.status}</Badge>
        </div>

        {/* Order Timeline */}
        <Card className="mb-6 p-6">
          <h2 className="text-foreground mb-6 text-lg font-semibold">
            Order Timeline
          </h2>
          <div className="space-y-4">
            {order.timeline.map((event, index) => {
              const Icon = statusIcons[event.status];
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Icon className="text-primary h-6 w-6" />
                    {index < order.timeline.length - 1 && (
                      <div className="bg-border mt-2 h-12 w-1" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-foreground font-medium">
                      {event.status}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Order Items */}
        <Card className="mb-6 p-6">
          <h2 className="text-foreground mb-4 text-lg font-semibold">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">
                    {item.productName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Quantity: {item.quantity} × ₹{item.unitPrice}
                  </p>
                </div>
                <p className="text-foreground font-medium">₹{item.subtotal}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Charge</span>
              <span className="text-foreground">₹{order.deliveryCharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">₹{order.tax}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">₹{order.totalAmount}</span>
            </div>
          </div>
        </Card>

        {/* Addresses */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              <h3 className="text-foreground font-semibold">Pickup Address</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-foreground font-medium">
                {order.pickupAddress.fullAddress}
              </p>
              {order.pickupAddress.apartment && (
                <p className="text-muted-foreground">
                  {order.pickupAddress.apartment}
                </p>
              )}
              {order.pickupAddress.landmark && (
                <p className="text-muted-foreground">
                  Landmark: {order.pickupAddress.landmark}
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              <h3 className="text-foreground font-semibold">
                Delivery Address
              </h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-foreground font-medium">
                {order.deliveryAddress.fullAddress}
              </p>
              {order.deliveryAddress.apartment && (
                <p className="text-muted-foreground">
                  {order.deliveryAddress.apartment}
                </p>
              )}
              {order.deliveryAddress.landmark && (
                <p className="text-muted-foreground">
                  Landmark: {order.deliveryAddress.landmark}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Slots & Riders */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="text-primary h-5 w-5" />
              <h3 className="text-foreground font-semibold">Pickup Slot</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Date:</span>{' '}
                {order.preferredPickupSlot.date}
              </p>
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Time:</span>{' '}
                {order.preferredPickupSlot.from} -{' '}
                {order.preferredPickupSlot.to}
              </p>
              {order.pickupRider && (
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Rider:</span>{' '}
                  {order.pickupRider.name}
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="text-primary h-5 w-5" />
              <h3 className="text-foreground font-semibold">Delivery Slot</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Date:</span>{' '}
                {order.preferredDeliverySlot.date}
              </p>
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Time:</span>{' '}
                {order.preferredDeliverySlot.from} -{' '}
                {order.preferredDeliverySlot.to}
              </p>
              {order.deliveryRider && (
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Rider:</span>{' '}
                  {order.deliveryRider.name}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Special Instructions & Details */}
        <Card className="p-6">
          <h2 className="text-foreground mb-4 text-lg font-semibold">
            Special Instructions & Details
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Instructions</p>
              <p className="text-foreground">{order.specialInstructions}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Detergent Type</p>
              <p className="text-foreground">{order.detergentType}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Weight</p>
              <p className="text-foreground">{order.totalWeightKg} kg</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Perfume</p>
              <p className="text-foreground">
                {order.perfume ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
