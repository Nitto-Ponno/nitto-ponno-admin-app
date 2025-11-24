'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { memo, useEffect } from 'react';
import { useCreateAttributeMutation } from '@/redux/api/attribute/attribute-api';

// ZOD SCHEMA

const attributeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  options: z
    .array(
      z.object({
        value: z.string().min(1, 'Option value required'),
      }),
    )
    .min(1, 'At least one option is required'),
});

type TAttributeForm = z.infer<typeof attributeSchema>;

type Props = {
  id?: string;
  onClose?: React.Dispatch<boolean>;
  initialData?: any;
};

function AddAttributeForm({ id, onClose, initialData }: Props) {
  const [createAttribute] = useCreateAttributeMutation();

  const form = useForm<TAttributeForm>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      options: initialData?.options || [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData]);

  async function onSubmit(values: TAttributeForm) {
    console.log('Submitted Attribute:', values);

    const res = await createAttribute(values);

    console.log({ res });

    toast.success(id ? 'Attribute updated successfully' : 'Attribute created');

    onClose?.(false);
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
              <FormLabel>Attribute Name</FormLabel>
              <FormControl>
                <Input placeholder="Stain Level" {...field} />
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
                <Input placeholder="stain-level" {...field} />
              </FormControl>
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
                  placeholder="Indicates severity of stains for treatment priority"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options */}
        <div className="space-y-2">
          <FormLabel>Options</FormLabel>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name={`options.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Light / Medium / Heavy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ value: '' })}
          >
            + Add Option
          </Button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>

          <Button type="submit">
            {id ? 'Update Attribute' : 'Create Attribute'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(AddAttributeForm);
