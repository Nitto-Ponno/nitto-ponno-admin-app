'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BasicInfoSection } from './basic-info-section';
import { PricingSection } from './pricing-section';
import { DescriptionSection } from './description-section';
import { ImagesSection } from './images-section';
import { TagsSection } from './tags-section';
import { InventorySection } from './inventory-section';
import { VariantsSection } from './variants-section';
import { memo, useEffect } from 'react';
import products from '@/components/pages/products/products.json';

const formSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  title: z.object({
    en: z.string().min(1, 'English title is required'),
    pt: z.string().optional(),
    hi: z.string().optional(),
    ur: z.string().optional(),
    ar: z.string().optional(),
    de: z.string().optional(),
    bn: z.string().optional(),
  }),
  slug: z.string().min(1, 'Slug is required'),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().min(1, 'Barcode is required'),
  prices: z.object({
    originalPrice: z.number().min(0, 'Original price must be positive'),
    price: z.number().min(0, 'Price must be positive'),
    discount: z.number().min(0).max(100, 'Discount must be between 0 and 100'),
  }),
  image: z
    .array(z.string().url('Must be a valid URL'))
    .min(1, 'At least one image is required'),
  tag: z.array(z.string()),
  description: z.object({
    en: z.string().min(1, 'English description is required'),
    pt: z.string().optional(),
    hi: z.string().optional(),
    ur: z.string().optional(),
    ar: z.string().optional(),
    de: z.string().optional(),
    bn: z.string().optional(),
  }),
  stock: z.number().min(0, 'Stock must be positive'),
  status: z.enum(['show', 'hide']),
  isCombination: z.boolean(),
  variants: z.array(z.any()).optional(),
});

function AddProductForm({ slug }: { slug?: string }) {
  const product = products.find((item) => item?.slug === slug);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: product?._id || '',
      title: product?.title || { en: '' },
      slug: product?.slug || '',
      sku: product?.sku || '',
      barcode: product?.barcode || '',
      prices: product?.prices || { originalPrice: 0, price: 0, discount: 0 },
      image: product?.image || [''],
      tag: product?.tag || [],
      description: product?.description || { en: '' },
      stock: product?.stock ?? 0,
      status: (product?.status as any) || 'hide',
      isCombination: product?.isCombination || false,
      variants: product?.variants || [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast('Your product has been successfully added.');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoSection form={form} />
        <PricingSection form={form} />
        <DescriptionSection form={form} />
        <ImagesSection form={form} />
        <TagsSection form={form} />
        <InventorySection form={form} />
        <VariantsSection form={form} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(AddProductForm);
