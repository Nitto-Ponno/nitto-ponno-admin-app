import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Product, ProductTitle } from '@/types';
import { memo } from 'react';

interface ProductCategoriesProps {
  product: Product;
  selectedLanguage: keyof ProductTitle;
}

function ProductCategories({
  product,
  selectedLanguage,
}: ProductCategoriesProps) {
  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Primary Category</CardTitle>
        </CardHeader>
        <CardContent>
          {product?.category ? (
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">
                  Category ID
                </p>
                <p className="bg-muted/50 rounded p-2 font-mono text-sm">
                  {product.category._id}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Category Names (All Languages)
                </p>
                <div className="space-y-2">
                  {Object.entries(product.category.name ?? {}).map(
                    ([lang, name]) => (
                      <div
                        key={lang}
                        className="bg-muted/50 flex items-center justify-between rounded p-2"
                      >
                        <Badge variant="outline" className="text-xs uppercase">
                          {lang}
                        </Badge>
                        <span className="font-medium">{name}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No primary category</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>
            All Categories ({product?.categories?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(product?.categories?.length ?? 0) > 0 ? (
            <div className="space-y-4">
              {product?.categories?.map((cat, idx) => (
                <Card key={cat?._id ?? idx} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Category #{idx + 1}</h4>
                        <Badge variant="secondary">
                          {cat?.name?.[selectedLanguage] ??
                            cat?.name?.en ??
                            'N/A'}
                        </Badge>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                          Category ID
                        </p>
                        <p className="bg-muted/50 rounded p-2 font-mono text-xs break-all">
                          {cat?._id ?? 'N/A'}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Names in All Languages
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(cat?.name ?? {}).map(
                            ([lang, name]) => (
                              <div
                                key={lang}
                                className="bg-muted/50 flex items-center gap-2 rounded p-2"
                              >
                                <Badge
                                  variant="outline"
                                  className="text-xs uppercase"
                                >
                                  {lang}
                                </Badge>
                                <span className="truncate text-sm font-medium">
                                  {name}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-8 text-center">
              No categories assigned
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
export default memo(ProductCategories);
