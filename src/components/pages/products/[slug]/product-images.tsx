import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { memo } from 'react';

interface ProductImagesProps {
  product: Product;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}

function ProductImages({
  product,
  selectedImage,
  setSelectedImage,
}: ProductImagesProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Product Images ({product?.image?.length ?? 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(product?.image?.length ?? 0) > 0 ? (
          <div className="space-y-6">
            {product?.image?.map((img: string, idx: number) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-center">
                      <img
                        src={img || '/placeholder.svg'}
                        alt={`Product image ${idx + 1}`}
                        className="border-border/50 aspect-square w-full max-w-sm rounded-lg border-2 object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                          Image #{idx + 1}
                        </p>
                        <Badge variant="outline">
                          Primary: {idx === 0 ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Image URL
                        </p>
                        <p className="bg-muted/50 rounded p-3 font-mono text-xs break-all">
                          {img}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedImage(idx)}
                        className="w-full"
                      >
                        Set as Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            No images available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
export default memo(ProductImages);
