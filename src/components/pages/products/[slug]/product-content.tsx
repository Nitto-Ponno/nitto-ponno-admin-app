import { memo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  TrendingUp,
  Calendar,
  Tag,
  Globe,
  CheckCircle2,
  XCircle,
  Database,
  DollarSign,
  ImageIcon,
  Layers,
} from 'lucide-react';
import { Product, ProductTitle } from '@/types';

const ProductContent = ({ product }: { product: Product }) => {
  const languages = Object.keys(product?.title ?? {}) as (keyof ProductTitle)[];
  return (
    <>
      {' '}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Product Titles (All Languages)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {languages.map((lang) => (
            <div key={lang}>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs uppercase">
                  {lang}
                </Badge>
              </div>
              <p className="bg-muted/50 rounded p-3 text-lg font-semibold">
                {product?.title?.[lang] ?? 'N/A'}
              </p>
              {lang !== languages[languages.length - 1] && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Product Descriptions (All Languages)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {languages.map((lang) => (
            <div key={lang}>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs uppercase">
                  {lang}
                </Badge>
              </div>
              <p className="text-muted-foreground bg-muted/50 rounded p-3 leading-relaxed whitespace-pre-wrap">
                {product?.description?.[lang] ?? 'No description available'}
              </p>
              {lang !== languages[languages.length - 1] && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ProductContent);
