'use client';

import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DescriptionSectionProps {
  form: UseFormReturn<any>;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ar', label: 'Arabic' },
  { code: 'de', label: 'German' },
  { code: 'bn', label: 'Bengali' },
];

export function DescriptionSection({ form }: DescriptionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Description</CardTitle>
        <CardDescription>
          Add descriptions in multiple languages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="h-auto flex-wrap">
            {languages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code}>
                {lang.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {languages.map((lang) => (
            <TabsContent key={lang.code} value={lang.code}>
              <FormField
                control={form.control}
                name={`description.${lang.code}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{lang.label} Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Enter product description in ${lang.label}`}
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
