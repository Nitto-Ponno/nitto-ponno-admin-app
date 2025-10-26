'use client';

import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { X, Plus } from 'lucide-react';

interface ImagesSectionProps {
  form: UseFormReturn<any>;
}

export function ImagesSection({ form }: ImagesSectionProps) {
  const images = form.watch('image') || [];

  const addImage = () => {
    const currentImages = form.getValues('image') || [];
    form.setValue('image', [...currentImages, '']);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('image') || [];
    form.setValue(
      'image',
      currentImages.filter((_: string, i: number) => i !== index),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Add product image URLs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {images.map((image: string, index: number) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              name={`image.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                    Image URL {index + 1}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeImage(index)}
              className="mt-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addImage}
          className="w-full bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
        <FormDescription>Add multiple product images</FormDescription>
      </CardContent>
    </Card>
  );
}
