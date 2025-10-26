import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Product } from '@/types';
import { memo } from 'react';

interface ProductPricingProps {
  product: Product;
}

function ProductPricing({ product }: ProductPricingProps) {
  const totalVariants = product?.variants?.length ?? 0;

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Base Product Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                Original Price
              </p>
              <p className="text-3xl font-bold">
                ${product?.prices?.originalPrice?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                Current Price
              </p>
              <p className="text-3xl font-bold text-green-600">
                ${product?.prices?.price?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Discount</p>
              <Badge variant="destructive" className="px-4 py-2 text-2xl">
                {product?.prices?.discount ?? 0}% OFF
              </Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Savings Amount</p>
            <p className="text-2xl font-bold text-green-600">
              $
              {(
                (product?.prices?.originalPrice ?? 0) -
                (product?.prices?.price ?? 0)
              ).toFixed(2)}
            </p>
          </div>
          {product?.sales && (
            <>
              <Separator />
              <div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Total Sales
                </p>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <p className="text-2xl font-bold">
                    {product.sales.toLocaleString()} units
                  </p>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  Revenue: $
                  {(
                    (product?.prices?.price ?? 0) * product.sales
                  ).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {totalVariants > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Variant Pricing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {product?.variants?.map((variant, idx) => (
                <Card key={idx} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-semibold">Variant #{idx + 1}</h4>
                      <Badge
                        variant={
                          (variant?.quantity ?? 0) > 0
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {variant?.quantity ?? 0} in stock
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Original Price
                        </p>
                        <p className="font-semibold">
                          ${Number(variant?.originalPrice ?? 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Current Price
                        </p>
                        <p className="font-semibold text-green-600">
                          ${Number(variant?.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Discount
                        </p>
                        <Badge variant="secondary">
                          {variant?.discount ?? 0}%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Savings</p>
                        <p className="font-semibold text-green-600">
                          $
                          {(
                            Number(variant?.originalPrice ?? 0) -
                            Number(variant?.price ?? 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
export default memo(ProductPricing);
