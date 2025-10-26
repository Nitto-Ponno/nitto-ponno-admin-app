import ProductDetailComp from '@/components/pages/products/[slug]/product-detail-comp';
import React from 'react';
import products from '@/components/pages/products/products.json';
import { Product } from '@/types';
const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  console.log({ slug });
  const product = products.find((item) => item.slug === slug);
  return (
    <>
      <ProductDetailComp product={product as Product} />
    </>
  );
};

export default ProductDetailPage;
