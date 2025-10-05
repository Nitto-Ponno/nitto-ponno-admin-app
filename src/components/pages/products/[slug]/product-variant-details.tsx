import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProductVariant } from '@/types';
import { memo } from 'react';

interface ProductVariantDetailsProps {
  currentVariant?: ProductVariant;
}

function ProductVariantDetails({ currentVariant }: ProductVariantDetailsProps) {
  return (
    <Card className="border-border/50 mt-8">
      <CardHeader>
        <CardTitle>Selected Variant Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">
              Variant Product ID
            </p>
            <p className="font-mono text-sm">
              {currentVariant?.productId ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">
              Variant Barcode
            </p>
            <p className="font-mono text-sm">
              {currentVariant?.barcode ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Variant SKU</p>
            <p className="font-mono text-sm">{currentVariant?.sku ?? 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default memo(ProductVariantDetails);
