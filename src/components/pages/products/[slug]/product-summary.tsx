import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Package, TrendingUp, Layers } from 'lucide-react';
import { Product } from '@/types';
import { memo } from 'react';

interface ProductSummaryProps {
  product: Product;
}

function ProductSummary({ product }: ProductSummaryProps) {
  const totalVariantStock =
    product?.variants?.reduce((sum, v) => sum + (v?.quantity ?? 0), 0) ?? 0;
  const totalVariants = product?.variants?.length ?? 0;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <DollarSign className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Current Price</p>
                <p className="text-xl font-bold">
                  ${product?.prices?.price?.toFixed(2) ?? '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Package className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Stock</p>
                <p className="text-xl font-bold">{product?.stock ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Sales</p>
                <p className="text-xl font-bold">
                  {product?.sales?.toLocaleString() ?? '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Layers className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Variants</p>
                <p className="text-xl font-bold">{totalVariants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default memo(ProductSummary);
