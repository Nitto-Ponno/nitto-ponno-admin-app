'use client';

import { memo, useState } from 'react';

import { Product, ProductTitle } from '@/types';
import ProductHeader from './product-header';
import ProductSummary from './product-summary';
import ProductTabs from './product-tabs';
import ProductVariantDetails from './product-variant-details';

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof ProductTitle>('en');

  const currentVariant = product?.variants?.[selectedVariant];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      <ProductHeader product={product} />
      <ProductSummary product={product} />
      <ProductTabs
        product={product}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        formatDate={formatDate}
      />
      <ProductVariantDetails currentVariant={currentVariant} />
    </div>
  );
}
export default memo(ProductDetails);
