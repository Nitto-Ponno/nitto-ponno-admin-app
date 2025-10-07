'use client';

import type { UseFormReturn } from 'react-hook-form';
import { FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

interface TagsSectionProps {
  form: UseFormReturn<any>;
}

export function TagsSection({ form }: TagsSectionProps) {
  const [tagInput, setTagInput] = useState('');
  const tags = form.watch('tag') || [];

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues('tag') || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue('tag', [...currentTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tag') || [];
    form.setValue(
      'tag',
      currentTags.filter((tag: string) => tag !== tagToRemove),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>
          Add tags to help categorize your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <FormDescription>Press Enter or click Add to add a tag</FormDescription>
      </CardContent>
    </Card>
  );
}
