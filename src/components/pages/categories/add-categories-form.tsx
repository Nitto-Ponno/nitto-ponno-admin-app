'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { memo, useEffect, useMemo } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from '@/redux/api/categories/categories-api';
import { TCategory } from '@/types';

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  parent_id: z.string().nullable().optional(),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
});

type Props = {
  id?: string;
  allCategories: TCategory[] | [];
  onClose: React.Dispatch<boolean>;
};

function AddCategoryForm({ allCategories, id, onClose }: Props) {
  const skipQuery = !id;

  const { data } = useGetSingleCategoryQuery({ id: id! }, { skip: skipQuery });
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const singleData = data?.data;

  const flatCategory = useMemo(() => {
    const result: { _id: string; slug: string; name: string }[] = [];

    const recursiveCategory = (cats: TCategory[]) => {
      cats.forEach((cat) => {
        result.push({
          _id: cat._id,
          slug: cat.slug,
          name: cat.name,
        });
        if (cat.subCategories && cat.subCategories.length > 0) {
          recursiveCategory(cat.subCategories);
        }
      });
    };

    if (allCategories) {
      recursiveCategory(allCategories);
    }

    return result;
  }, [allCategories]);

  console.log({ singleData });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: singleData?.name || '',
      parent_id: singleData?.parent_id || null,
      slug: singleData?.slug || '',
      description: singleData?.description || '',
    },
  });

  useEffect(() => {
    form.reset({
      name: singleData?.name || '',
      parent_id: singleData?.parent_id || null,
      slug: singleData?.slug || '',
      description: singleData?.description || '',
    });
  }, [singleData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (!id) {
      const res = await createCategory(values);

      if (res?.data?.success) {
        toast.success(res.data?.message);
        onClose(false);
      } else {
        toast.error(res?.data?.message);
      }
    } else {
      const res = await updateCategory({
        _id: singleData?._id,
        name: values.name,
        description: values.description,
      });

      if (res?.data?.success) {
        toast.success(res.data?.message);
        onClose(false);
      } else {
        toast.error(res?.data?.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="electronics"
                  {...field}
                  disabled={id ? true : false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Category */}
        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === 'none' ? null : value)
                }
                defaultValue={field.value ?? 'none'}
              >
                <FormControl>
                  <SelectTrigger disabled={id ? true : false}>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {flatCategory?.map((cat) => (
                    <SelectItem key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {id ? 'Update Category' : 'Add Category'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(AddCategoryForm);
