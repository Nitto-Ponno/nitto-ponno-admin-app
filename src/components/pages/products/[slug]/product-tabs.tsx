import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Product, ProductTitle } from '@/types';
import ProductContent from './product-content';
import ProductPricing from './Product-pricing';
import ProductVariants from './product-variants';
import ProductImages from './product-images';
import ProductCategories from './product-categories';
import ProductMetadata from './product-metadata';
import ProductOverview from './product-overview';
import { memo } from 'react';

interface ProductTabsProps {
  product: Product;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  selectedVariant: number;
  setSelectedVariant: (index: number) => void;
  selectedLanguage: keyof ProductTitle;
  setSelectedLanguage: (lang: keyof ProductTitle) => void;
  formatDate: (dateString?: string) => string;
}

function ProductTabs({
  product,
  selectedImage,
  setSelectedImage,
  selectedVariant,
  setSelectedVariant,
  selectedLanguage,
  setSelectedLanguage,
  formatDate,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="variants">Variants</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <ProductOverview product={product} />
      </TabsContent>
      <TabsContent value="content" className="space-y-6">
        <ProductContent product={product} />
      </TabsContent>
      <TabsContent value="pricing" className="space-y-6">
        <ProductPricing product={product} />
      </TabsContent>
      <TabsContent value="variants" className="space-y-6">
        <ProductVariants
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          setSelectedImage={setSelectedImage}
        />
      </TabsContent>
      <TabsContent value="images" className="space-y-6">
        <ProductImages
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </TabsContent>
      <TabsContent value="categories" className="space-y-6">
        <ProductCategories
          product={product}
          selectedLanguage={selectedLanguage}
        />
      </TabsContent>
      <TabsContent value="metadata" className="space-y-6">
        <ProductMetadata product={product} formatDate={formatDate} />
      </TabsContent>
    </Tabs>
  );
}
export default memo(ProductTabs);
