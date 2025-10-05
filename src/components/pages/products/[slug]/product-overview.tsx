import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types';
import { Database, Package, Tag } from 'lucide-react';
import React, { memo } from 'react';

const ProductOverview = ({ product }: { product: Product }) => {
  const totalVariantStock =
    product?.variants?.reduce((sum, v) => sum + (v?.quantity ?? 0), 0) ?? 0;
  const totalVariants = product?.variants?.length ?? 0;
  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Product Identifiers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                Database ID (_id)
              </p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm break-all">
                {product?._id ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Product ID</p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                {product?.productId ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">SKU</p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                {product?.sku ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Barcode</p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                {product?.barcode ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Slug</p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                {product?.slug ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                Version (__v)
              </p>
              <Badge variant="outline">v{product?.__v ?? 0}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Status & Stock
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Status</p>
              <Badge
                variant={product?.status === 'show' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {product?.status?.toUpperCase() ?? 'N/A'}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                Is Combination
              </p>
              <Badge variant={product?.isCombination ? 'default' : 'outline'}>
                {product?.isCombination ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Total Stock</p>
              <p className="text-2xl font-bold">{product?.stock ?? 0}</p>
            </div>
          </div>
          {totalVariants > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Variant Stock Summary
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Total Variants
                    </p>
                    <p className="text-lg font-semibold">{totalVariants}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Total Variant Stock
                    </p>
                    <p className="text-lg font-semibold">{totalVariantStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Avg Stock per Variant
                    </p>
                    <p className="text-lg font-semibold">
                      {totalVariants > 0
                        ? Math.round(totalVariantStock / totalVariants)
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(product?.tag?.length ?? 0) > 0 ? (
              product?.tag?.map((tag, idx) => (
                <Badge key={idx} variant="outline">
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No tags</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ProductOverview);
