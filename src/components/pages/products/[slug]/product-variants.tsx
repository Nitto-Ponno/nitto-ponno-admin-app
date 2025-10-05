import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface ProductVariantsProps {
  product: Product;
  selectedVariant: number;
  setSelectedVariant: (index: number) => void;
  setSelectedImage: (index: number) => void;
}

function ProductVariants({
  product,
  selectedVariant,
  setSelectedVariant,
  setSelectedImage,
}: ProductVariantsProps) {
  const totalVariants = product?.variants?.length ?? 0;

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          All Product Variants ({totalVariants})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalVariants > 0 ? (
          <div className="space-y-4">
            {product?.variants?.map((variant: ProductVariant, idx: number) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold">
                      Variant #{idx + 1}
                    </h4>
                    <Badge
                      variant={
                        (variant?.quantity ?? 0) > 20
                          ? 'default'
                          : (variant?.quantity ?? 0) > 0
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {variant?.quantity ?? 0} in stock
                    </Badge>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <h5 className="text-muted-foreground text-sm font-semibold">
                        Variant Attributes
                      </h5>
                      {Object.entries(variant ?? {}).map(([key, value]) => {
                        if (
                          ![
                            'price',
                            'originalPrice',
                            'quantity',
                            'discount',
                            'productId',
                            'barcode',
                            'sku',
                            'image',
                          ].includes(key)
                        ) {
                          return (
                            <div
                              key={key}
                              className="border-border/50 flex items-center justify-between border-b py-2"
                            >
                              <span className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="bg-muted/50 rounded px-2 py-1 font-mono text-sm">
                                {String(value)}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedVariant(idx);
                          if (variant?.image) {
                            const imageIndex =
                              product?.image?.findIndex(
                                (img) => img === variant.image,
                              ) ?? -1;
                            if (imageIndex !== -1) setSelectedImage(imageIndex);
                          }
                        }}
                        className="mt-4 w-full"
                      >
                        Select Variant
                      </Button>
                    </div>
                    {variant?.image && (
                      <div className="flex flex-col items-center justify-center gap-3">
                        <img
                          src={variant.image || '/placeholder.svg'}
                          alt={`Variant ${idx + 1}`}
                          className="border-border/50 h-48 w-48 rounded-lg border-2 object-cover"
                        />
                        <p className="text-muted-foreground text-center font-mono text-xs break-all">
                          {variant.image}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            No variants available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
export default memo(ProductVariants);
