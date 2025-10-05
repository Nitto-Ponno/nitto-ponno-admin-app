import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Database } from 'lucide-react';
import { Product, ProductTitle } from '@/types';
import { memo } from 'react';

interface ProductMetadataProps {
  product: Product;
  formatDate: (dateString?: string) => string;
}

function ProductMetadata({ product, formatDate }: ProductMetadataProps) {
  const languages = Object.keys(product?.title ?? {}) as (keyof ProductTitle)[];

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timestamps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Created At</p>
              <p className="text-lg font-semibold">
                {formatDate(product?.createdAt)}
              </p>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {product?.createdAt ?? 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Last Updated</p>
              <p className="text-lg font-semibold">
                {formatDate(product?.updatedAt)}
              </p>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {product?.updatedAt ?? 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-2 text-sm">
              MongoDB Document ID
            </p>
            <p className="bg-muted/50 rounded p-3 font-mono text-sm break-all">
              {product?._id ?? 'N/A'}
            </p>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                Document Version
              </p>
              <Badge variant="outline" className="px-4 py-2 text-lg">
                v{product?.__v ?? 0}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Product ID</p>
              <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                {product?.productId ?? 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Complete Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{languages.length}</p>
              <p className="text-muted-foreground mt-1 text-xs">Languages</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">
                {product?.image?.length ?? 0}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Images</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">
                {product?.categories?.length ?? 0}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Categories</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{product?.tag?.length ?? 0}</p>
              <p className="text-muted-foreground mt-1 text-xs">Tags</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">
                {product?.variants?.length ?? 0}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Variants</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{product?.stock ?? 0}</p>
              <p className="text-muted-foreground mt-1 text-xs">Base Stock</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">
                {product?.variants?.reduce(
                  (sum, v) => sum + (v?.quantity ?? 0),
                  0,
                ) ?? 0}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Variant Stock
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">
                {product?.sales?.toLocaleString() ?? 0}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Sales</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default memo(ProductMetadata);
