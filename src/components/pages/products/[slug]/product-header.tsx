import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Package } from 'lucide-react';
import { Product } from '@/types';
import { memo } from 'react';

interface ProductHeaderProps {
  product: Product;
}

function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {product?.title?.en ?? 'Product'}
        </h1>
        <div className="flex items-center gap-3">
          <Badge
            variant={product?.status === 'show' ? 'default' : 'secondary'}
            className="text-sm"
          >
            {product?.status === 'show' ? (
              <>
                <CheckCircle2 className="mr-1 h-3 w-3" /> Active
              </>
            ) : (
              <>
                <XCircle className="mr-1 h-3 w-3" /> Hidden
              </>
            )}
          </Badge>
          {product?.isCombination && (
            <Badge variant="outline" className="text-sm">
              <Package className="mr-1 h-3 w-3" /> Has Variants
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
export default memo(ProductHeader);
