'use client';

import React, { ReactNode, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TCategory } from '@/types';
import { format } from 'date-fns';
import { Edit2, Ellipsis, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import GlobalDropDown from '@/components/global/global-drop-down';
import Image from 'next/image';
import { GlobalDrawer } from '@/components/global/global-drawer';
import { Button } from '@/components/ui/button';
import AddCategoriesForm from './add-categories-form';
import { useDeleteCategoryMutation } from '@/redux/api/categories/categories-api';
import { toast } from 'sonner';

type RecursiveCategoriesProps = {
  categories: TCategory[];
};

const RecursiveCategories: React.FC<RecursiveCategoriesProps> = ({
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  if (!categories || !categories.length) return null;

  const onDelete = async (id: string) => {
    const res = await deleteCategory({ id });

    if (res.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {categories.map((category) => (
        <AccordionItem
          key={category._id}
          value={category._id}
          className="rounded-lg border px-2"
        >
          <AccordionTrigger className="flex cursor-pointer items-center hover:no-underline">
            <div className="flex w-full items-center justify-between">
              {/*  */}

              <div className="flex items-center gap-3">
                <Image
                  src={category?.image || '/no-image-found.jpg'}
                  width={100}
                  height={100}
                  alt="no-image-found.jpg"
                  className="size-14 rounded object-cover shadow"
                />
                <span className="text-base font-medium">{category.name}</span>
                {category.isFeatured && (
                  <span className="text-primary bg-primary/10 rounded-md px-2 py-0.5 text-xs">
                    Featured
                  </span>
                )}
              </div>

              {/*  */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground text-sm">
                  Added: {format(new Date(category.createdAt), 'dd/MM/yyyy')}
                </span>
                <GlobalDropDown
                  dropdownMenuLabel="Actions"
                  dropdownMenuTrigger={
                    <span className="text-center">
                      <Ellipsis className="text-sidebar-accent-foreground size-4" />
                    </span>
                  }
                  dropdownMenuItems={[
                    <Link
                      href={`/category/${category.slug}`}
                      key={'view-more'}
                      className="w-full items-center justify-center !text-center"
                    >
                      View more
                    </Link>,

                    <GlobalDrawer
                      key={'add product'}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      drawerTrigger={
                        <Button
                          variant={'outline'}
                          type="button"
                          className="w-full"
                        >
                          <Plus />
                          Edit category
                        </Button>
                      }
                    >
                      <AddCategoriesForm
                        onClose={setIsOpen}
                        allCategories={categories || []}
                        id={category._id}
                      />
                    </GlobalDrawer>,

                    <Button
                      variant={'outline'}
                      type="button"
                      key={'delete'}
                      disabled={isLoading}
                      className="hover:!bg-destructive/30"
                      onClick={() => onDelete(category._id)}
                    >
                      <Trash2 />
                      Delete category
                    </Button>,
                  ]}
                />
              </div>
              {/*  */}
            </div>
          </AccordionTrigger>

          <AccordionContent className="border-primary ml-4 space-y-2 border-l pl-4">
            {category.description && (
              <p className="text-muted-foreground mb-2 text-sm">
                {category.description}
              </p>
            )}

            {category.subCategories && category.subCategories.length > 0 ? (
              <RecursiveCategories categories={category.subCategories} />
            ) : (
              <p className="text-destructive text-sm italic">
                No subcategories
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default RecursiveCategories;
